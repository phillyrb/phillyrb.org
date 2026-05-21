require "net/http"
require "uri"

namespace :a11y do
  A11Y_PORT  = ENV.fetch("A11Y_PORT", "8765")
  A11Y_HOST  = "http://localhost:#{A11Y_PORT}"
  BUILD_DIR  = File.expand_path("../build", __dir__)
  RUNNER     = File.expand_path("a11y-runner.js", __dir__)
  NPM_BIN    = File.expand_path("../node_modules/.bin", __dir__)
  NODE_MODS  = File.expand_path("../node_modules", __dir__)

  def node_modules_installed?
    File.directory?(NODE_MODS) &&
      File.exist?("#{NPM_BIN}/http-server") &&
      File.directory?("#{NODE_MODS}/puppeteer") &&
      File.directory?("#{NODE_MODS}/axe-core")
  end

  def ensure_node_deps!
    return if node_modules_installed?

    puts "Installing Node.js dependencies (axe-core, puppeteer, http-server)..."
    Dir.chdir(File.expand_path("..", __dir__)) do
      system("npm install --no-audit --no-fund") or
        abort("npm install failed")
    end
  end

  def wait_for_server!(host, tries: 30, delay: 0.5)
    tries.times do
      begin
        Net::HTTP.get_response(URI(host))
        return
      rescue Errno::ECONNREFUSED, EOFError
        sleep delay
      end
    end
    abort "Static server at #{host} did not start within #{tries * delay}s"
  end

  desc "Run axe-core against the built site (WCAG 2 AA)"
  task :test do
    ensure_node_deps!

    Rake::Task["a11y:build"].invoke unless ENV["A11Y_SKIP_BUILD"] == "1"

    puts "Starting static server on #{A11Y_HOST} (serving build/) ..."
    server_pid = Process.spawn(
      "#{NPM_BIN}/http-server",
      BUILD_DIR,
      "--port", A11Y_PORT,
      "--silent",
      out: "/dev/null", err: "/dev/null"
    )

    begin
      wait_for_server!(A11Y_HOST)
      puts "Running axe-core a11y check ..."
      env = { "A11Y_PORT" => A11Y_PORT }
      ok = system(env, "node", RUNNER)
      abort "Accessibility check failed" unless ok
    ensure
      begin
        Process.kill("TERM", server_pid)
        Process.wait(server_pid)
      rescue Errno::ESRCH, Errno::ECHILD
        # already gone
      end
    end
  end

  desc "Build the site for accessibility testing (alias for middleman build)"
  task :build do
    sh "bundle exec middleman build"
  end
end

desc "Run accessibility checks against the built site"
task :a11y => "a11y:test"
