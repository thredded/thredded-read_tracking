Thredded::Engine.routes.draw do
  get '/topic_reads/*topic_ids', to: 'topic_reads#index'
  resources :topic_reads, only: [:update]
end
