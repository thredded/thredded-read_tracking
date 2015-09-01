module Thredded
  class TopicRead
    def self.upsert(params)
      topic_id = params[:topic_id]
      furthest_post = params[:furthest_post].to_i
      furthest_page = params[:furthest_page].to_i
      done_reading = params[:done_reading] == 'true' ? true : false

      $redis.hmset(
        "thredded:reads:#{topic_id}",
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
  end
end
