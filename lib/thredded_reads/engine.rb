module ThreddedReads
  class Engine < ::Rails::Engine
    config.generators do |g|
      g.test_framework :rspec, fixture: false
      g.fixture_replacement :factory_girl, dir: 'spec/factories'
      g.assets false
      g.helper false
    end

    config.assets.precompile += %w( thredded_reads.js )

    initializer 'thredded.initialize_redis' do
      $redis ||= ::Redis.new(url: 'redis://localhost:6379/2')
    end
  end
end
