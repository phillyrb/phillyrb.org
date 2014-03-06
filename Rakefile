require 'fileutils'

task default: :build

desc "Build the static site to build/"
task build: [:bower, :middleman]

desc "Clean build/, along with other dependencies"
task :clean do
  FileUtils.rm_rf 'bower_components'
  FileUtils.rm_rf 'build'
end

task :bower do
  system 'bower install'
  raise unless $?.success?
end

task :middleman do
  system 'middleman build'
  raise unless $?.success?
end
