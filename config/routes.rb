Rails.application.routes.draw do

  resources :maps

  devise_for :users

  root 'home#index'

  get '/auth', to: 'sessions#create'

  get '/auth/:provider/callback', to: 'sessions#create'

  get '/users/current', to: 'users#currentUser'

  get '/users/:id', to: 'users#show'

  get '/locations/all', to: 'locations#getAllLocations'

  get '/locations/bymapid', to: 'locations#getLocationsByMap'


end
