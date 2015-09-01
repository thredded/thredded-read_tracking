module Thredded
  class TopicReadsController < ::ApplicationController
    def update
      Thredded::TopicRead.upsert(read_params)

      render nothing: true
    end

    def index
    end

    private

    def read_params
      require(:topic_read)
        .permit(
          :topic_id,
          :furthest_post,
          :furthest_page,
          :done_reading
        )
    end
  end
end
