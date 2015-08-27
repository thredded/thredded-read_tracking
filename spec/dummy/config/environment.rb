# Setup teaspoon (js testing) ENV's
ENV['TEASPOON_ENV'] =
  File.expand_path('../../../../spec/teaspoon_env.rb', __FILE__)
ENV['TEASPOON_RAILS_ENV'] =
  File.expand_path('../../../../spec/dummy/config/environment.rb', __FILE__)

# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!
