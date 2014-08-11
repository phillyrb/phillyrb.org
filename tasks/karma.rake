namespace :karma do
  def node_modules_installed?
    File.directory? "#{File.dirname(__FILE__)}/../node_modules"
  end

  def npm(command_args = '')
    if node_modules_installed?
      system "npm #{command_args}"
    else
      puts 'Installing Node.js dependencies...'
      system 'npm install'
      system "npm #{command_args}"
    end
  end

  task :default do
    npm 'run karma'
  end

  desc "Run the JavaScript specs once"
  task :ci do
    npm 'test'
  end
end

desc "Run the Karma JavaScript spec runner"
task :karma => 'karma:default'

task :default => 'karma:ci'
