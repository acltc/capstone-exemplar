Rails.application.routes.draw do
  get '/' => 'meetings#index'
  get '/meetings' => 'meetings#index'
end
