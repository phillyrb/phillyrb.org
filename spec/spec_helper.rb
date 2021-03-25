require "middleman"
require "middleman-blog"
require "middleman-core/rack"
require "rspec"
require "capybara/rspec"

middleman_app = ::Middleman::Application.new do
  set :root, File.expand_path(File.join(File.dirname(__FILE__), ".."))
  set :environment, :development
  set :show_exceptions, false
end

Capybara.app = ::Middleman::Rack.new(middleman_app).to_app
