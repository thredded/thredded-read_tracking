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
        done_reading: 'false',
        furthest_page: '5',
        furthest_post: '10',
        topic_id: '1',
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
        done_reading: 'true',
        furthest_page: '3',
        furthest_post: '101',
        topic_id: '2',
      )
      Thredded::TopicRead.upsert(params)

      expect(Thredded::TopicRead.find(2)).to eq(expected_results)
    end
  end

  describe '.where(topic_ids:)' do
    it 'returns the correct json for the data' do
      $redis.pipelined do
        $redis.hmset('thredded:reads:2',
                     'topic_id', '2',
                     'furthest_post', '10',
                     'furthest_page', '3',
                     'done_reading', 'true')
        $redis.hmset('thredded:reads:3',
                     'topic_id', '3',
                     'furthest_post', '20',
                     'furthest_page', '3',
                     'done_reading', 'false')
        $redis.hmset('thredded:reads:4',
                     'topic_id', '4',
                     'furthest_post', '30',
                     'furthest_page', '3',
                     'done_reading', 'true')
      end

      expected_results = HashWithIndifferentAccess.new(
        read: {
          '2': {
            furthest_post: '10',
            furthest_page: '3'
          },
          '4': {
            furthest_post: '30',
            furthest_page: '3'
          }
        },
        unread: {
          '3': {
            furthest_post: '20',
            furthest_page: '3'
          }
        }
      )

      read_and_unread = HashWithIndifferentAccess.new(
        Thredded::TopicRead.where(topic_ids: %w(2 3 4))
      )

      expect(read_and_unread).to eq(expected_results)
    end
  end
end
