$:.push File.expand_path('../lib', __FILE__)

require 'thredded_reads/version'

Gem::Specification.new do |s|
  s.name        = 'thredded_reads'
  s.version     = ThreddedReads::VERSION
  s.authors     = ['Joel Oliveira']
  s.email       = ['joel.oliveira@gmail.com']
  s.homepage    = 'https://www.thredded.com'
  s.summary     = "Track topics and posts you've read in your messageboard"
  s.description = 'The thredded engine does not track your read activity by default. This plugin will do that for you'
  s.license     = 'MIT'

  s.files = Dir['{app,bin,config,lib}/**/*', 'MIT-LICENSE', 'Rakefile']
  s.test_files = Dir['spec/**/*']

  s.add_dependency 'rails'
  s.add_dependency 'thredded'

  s.add_development_dependency 'sqlite3'
  s.add_development_dependency 'pg'
  s.add_development_dependency 'puma'
  s.add_development_dependency 'pry-rails'

  # testing
  s.add_development_dependency 'capybara'
  s.add_development_dependency 'database_cleaner'
  s.add_development_dependency 'factory_girl_rails'
  s.add_development_dependency 'rspec-rails'
  s.add_development_dependency 'shoulda-matchers'
  s.add_development_dependency 'test-unit'

  # assets
  s.add_development_dependency 'jquery-rails'
  s.add_development_dependency 'bourbon'
  s.add_development_dependency 'neat'
  s.add_development_dependency 'bitters'
  s.add_development_dependency 'sprockets-es6'
end
