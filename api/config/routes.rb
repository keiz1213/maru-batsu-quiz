Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: %i[create destroy]
      resources :games, only: %i[create show destroy update]
      resource :skyway_token, only: %i[show]

      namespace :current_user do
        resources :games, only: %i[index]
      end
    end
  end
end
