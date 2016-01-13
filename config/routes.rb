Rails.application.routes.draw do
  devise_for :users
  get '/' => 'landing_page#index'
  get '/meetings' => 'meetings#index'
end
