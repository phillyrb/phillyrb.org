require "middleman"
require "middleman-blog"
require "middleman-core/rack"
require "rspec"
require "capybara/rspec"
require "selenium-webdriver"

middleman_app = ::Middleman::Application.new do
  set :root, File.expand_path(File.join(File.dirname(__FILE__), ".."))
  set :environment, :development
  set :show_exceptions, false
end

Capybara.app = ::Middleman::Rack.new(middleman_app).to_app

# Headless Chrome driver used by the accessibility specs, which need a
# JavaScript-capable browser so axe-core can evaluate rendered contrast,
# focus order, and computed styles. The default rack_test driver is kept
# for the plain content specs.
Capybara.register_driver :headless_chrome do |app|
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument("--headless=new")
  options.add_argument("--no-sandbox")
  options.add_argument("--disable-setuid-sandbox")
  options.add_argument("--disable-gpu")
  options.add_argument("--force-prefers-reduced-motion")
  options.add_argument("--window-size=1280,800")

  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end

Capybara.javascript_driver = :headless_chrome
