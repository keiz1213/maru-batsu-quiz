Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :hello, only:[:index]
      resources :users, only:[:create]
      resources :skyway_token, only:[:create]
    end
  end
end
