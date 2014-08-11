require "middleman"
require "middleman-blog"
require 'rspec'
require 'capybara/webkit'
require 'capybara/rspec'

Capybara.javascript_driver = :webkit

Capybara.app = Middleman::Application.server.inst do
  set :root, File.expand_path(File.join(File.dirname(__FILE__), '..'))
  set :environment, :development
  set :show_exceptions, false
end
