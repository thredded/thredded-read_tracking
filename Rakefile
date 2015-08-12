#!/usr/bin/env rake

begin
  require 'bundler/setup'
rescue LoadError
  puts 'You must `gem install bundler` and `bundle install` to run rake tasks'
end

APP_RAKEFILE = File.expand_path('../spec/dummy/Rakefile', __FILE__)

load 'rails/tasks/engine.rake'
Bundler::GemHelper.install_tasks

require 'rspec/core'
require 'rspec/core/rake_task'

desc 'Run all specs in spec directory (excluding plugin specs)'
RSpec::Core::RakeTask.new(spec: 'app:db:test:prepare')

task default: :spec

namespace :dev do
  desc 'Start development web server'
  task :server do
    require 'rails/commands/server'

    host = '0.0.0.0'
    port = ENV['PORT'] || 9393
    ENV['RACK_ENV'] = ENV['RAILS_ENV'] = 'development'
    Dir.chdir 'spec/dummy'

    Rack::Server.start(
      environment: 'development',
      Host: host,
      Port: port,
      config: 'config.ru'
    )
  end

  desc 'Seed DB for dummy app development'
  task seed: :environment do
    Thredded::SeedDatabase.run
  end
end
