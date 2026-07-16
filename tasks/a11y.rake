# Accessibility check: builds the site, then runs the axe-core accessibility
# specs against the built output rendered in headless Chrome (via Capybara +
# the axe-core-rspec gem). See spec/features/accessibility_spec.rb.
#
# Convenience task for local runs: it builds the site and then runs the specs.
# Set A11Y_SKIP_BUILD=1 to reuse an existing build/ directory. (CI builds the
# site and runs the full RSpec suite directly, so it does not use this task.)
desc "Run accessibility checks against the built site (axe-core, WCAG 2 AA)"
task :a11y do
  sh "bundle exec middleman build" unless ENV["A11Y_SKIP_BUILD"] == "1"
  sh "bundle exec rspec spec/features/accessibility_spec.rb"
end
