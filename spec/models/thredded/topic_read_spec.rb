require 'spec_helper'

RSpec.describe Thredded::TopicRead, redis: true do
  describe '.find' do
    it 'finds a previously set record' do
      $redis.hmset(
        'thredded:reads:2',
        'furthest_post', '100',
        'furthest_page', '3',
        'done_reading', 'true'
      )
      expected_results = HashWithIndifferentAccess.new(
        furthest_post: '100',
        furthest_page: '3',
        done_reading: 'true'
      )

      expect(Thredded::TopicRead.find(2)).to eq(expected_results)
    end
  end

  describe '.upsert' do
    it 'creates a new record' do
      params = {
        topic_id: '1',
        furthest_post: '10',
        furthest_page: '5',
        done_reading: 'false'
      }
      expected_results = HashWithIndifferentAccess.new(
        furthest_post: '10',
        furthest_page: '5',
        done_reading: 'false'
      )

      Thredded::TopicRead.upsert(params)

      expect(Thredded::TopicRead.find(1)).to eq(expected_results)
    end

    it 'replaces the contents of what is already there' do
      $redis.hmset(
        'thredded:reads:2',
        'furthest_post', '100',
        'furthest_page', '3',
        'done_reading', 'true'
      )
      params = {
        topic_id: '2',
        furthest_post: '101',
        furthest_page: '3',
        done_reading: 'true'
      }
      expected_results = HashWithIndifferentAccess.new(
        furthest_post: '101',
        furthest_page: '3',
        done_reading: 'true'
      )
      Thredded::TopicRead.upsert(params)

      expect(Thredded::TopicRead.find(2)).to eq(expected_results)
    end
  end
end
