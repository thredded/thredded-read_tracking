module Thredded
  class TopicReadsController < Thredded::ApplicationController
    def update
      Thredded::TopicRead.upsert(read_params)

      render nothing: true
    end

    def index
      read_and_unread = Thredded::TopicRead.where(topic_ids: topic_ids)

      render json: read_and_unread
    end

    private

    def topic_ids
      params[:topic_ids].split('/')
    end

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
