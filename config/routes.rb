Rails.application.routes.draw do

  root 'home#index'  # point http://127.0.0.1:3000/ to home controller's index action

  get 'sessions/new'
  get 'sessions/create'
  get 'sessions/destroy'
  resources :sessions, only: [:new, :create, :destroy]  
  
  get 'signup', to: 'users#new', as: 'signup'  
  get 'login', to: 'sessions#new', as: 'login'  
  get 'logout', to: 'sessions#destroy', as: 'logout'  
  
  resources :users  
  
  resources :employees
  post 'employees/save', to: 'employees#save', as: 'save' # can add a path to any new action in the controller 
  
end
