module Thredded
  class TopicRead
    def self.upsert(params)
      topic_id = params[:topic_id]
      furthest_post = params[:furthest_post].to_i
      furthest_page = params[:furthest_page].to_i
      done_reading = params[:done_reading] == 'true' ? true : false

      $redis.hmset(
        "thredded:reads:#{topic_id}",
        'topic_id', topic_id,
        'furthest_post', furthest_post,
        'furthest_page', furthest_page,
        'done_reading', done_reading
      )
    end

    def self.find(topic_id)
      $redis
        .hgetall("thredded:reads:#{topic_id}")
        .with_indifferent_access
    end

    def self.where(topic_ids:)
      found = $redis.pipelined do
        topic_ids.each do |topic_id|
          $redis.hgetall "thredded:reads:#{topic_id}"
        end
      end

      read   = map_reduce_to_hash(found.select { |data| data['done_reading'] == 'true' })
      unread = map_reduce_to_hash(found.select { |data| data['done_reading'] == 'false' })

      {
        read: read,
        unread: unread
      }
    end

    def self.map_reduce_to_hash(topic_data)
      topic_data.map! do |data|
        topic_state = Hash.new
        topic_state[data['topic_id']] = {
          furthest_post: data['furthest_post'],
          furthest_page: data['furthest_page']
        }
        topic_state
      end.reduce({}, :merge)
    end
  end
end
