Rails.application.routes.draw do
  devise_for :users
  get '/' => 'meetings#index'
  get '/meetings' => 'meetings#index'
end
