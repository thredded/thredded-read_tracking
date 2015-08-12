require File.expand_path('../boot', __FILE__)

require 'rails/all'

Bundler.require(*Rails.groups)
require 'thredded_reads'

module Dummy
  class Application < Rails::Application
    config.active_record.raise_in_transactional_callbacks = true
  end
end
