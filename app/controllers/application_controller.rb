class ApplicationController < ActionController::Base

  protect_from_forgery with: :null_session 
  include Error::ErrorHandler
  
  private   
  def current_user   
    User.where(id: session[:user_id]).first   
  end   
  helper_method :current_user   

  def logged_in?
    !current_user.nil?  
  end

end
