Thredded::Engine.routes.draw do
  resources :topic_reads, only: [:index, :create, :update]
end
