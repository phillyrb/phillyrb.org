require "spec_helper"
require "axe-rspec"
require "rack"

# Accessibility gate: drives the *built* site in headless Chrome and fails on
# any axe-core WCAG 2 A/AA violation.
#
# We serve the static `build/` output (produced by `middleman build`) through a
# small Rack static server rather than Middleman's live dev Rack app. That keeps
# the check honest (it tests exactly what ships) and avoids the dev server's
# LiveReload injection and Rack 3 header quirks.
#
# `be_axe_clean` fails only on axe `violations`; `incomplete` results (e.g.
# contrast axe can't compute over a background image) are reported but do not
# fail the build.
RSpec.describe "accessibility (WCAG 2 AA)", type: :feature, js: true do
  build_dir = File.expand_path("../../build", __dir__)

  PAGES = {
    "the homepage" => "/",
    "a video page" => "/videos/2013-06-11-five-ruby-things/",
  }.freeze

  before(:all) do
    unless File.exist?(File.join(build_dir, "index.html"))
      raise "Built site not found at #{build_dir}. Run `bundle exec middleman " \
            "build` first (the `rake a11y` task does this for you)."
    end

    @previous_capybara_app = Capybara.app
    Capybara.app = Rack::Static.new(
      ->(_env) { [404, { "content-type" => "text/plain" }, ["Not Found"]] },
      root: build_dir,
      urls: [""],
      index: "index.html"
    )
  end

  after(:all) do
    Capybara.app = @previous_capybara_app
  end

  PAGES.each do |name, path|
    it "has no axe-core violations on #{name}" do
      visit path

      expect(page).to be_axe_clean.according_to(
        :wcag2a, :wcag21a, :wcag2aa, :wcag21aa
      )
    end
  end
end
