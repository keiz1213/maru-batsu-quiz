Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :hello, only: %i[index]
      resources :users, only: %i[show create destroy]
      resources :games, only: %i[create show destroy update]
      resource :skyway_token, only: %i[show]

      namespace :current_user do
        resource :user_id, only: %i[show]
        resources :games, only: %i[index]
      end
    end
  end
end
