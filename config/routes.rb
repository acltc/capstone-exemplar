Rails.application.routes.draw do
  devise_for :users
  get '/' => 'landing_page#index'
  get '/meetings' => 'meetings#index'
  get '/meetings/new' => 'meetings#new'
  post '/meetings' => 'meetings#create'
  get '/meetings/:id' => 'meetings#show'

  namespace :api do
    namespace :v1 do
      get '/meetings' => 'meetings#index'
      get '/meetings/:id' => 'meetings#show'
    end
  end
end
