class UsersController < ApplicationController

  def new 
    @user = User.new
  end

  def create   
    @user = User.new(params.require(:user).permit(:first_name, :last_name, :age, :email, :password))
    if @user.save   
      session[:user_id] = @user.id   
      redirect_to root_url, notice: 'User successfully created.'   
    else   
      render :new   
    end   
  end  

end
