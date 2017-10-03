Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  mount ActionCable.server => '/cable'

  root 'static#index'
  resources :messages, only: [:index, :create] do
    member do
      get 'load_more'
    end
  end
end
