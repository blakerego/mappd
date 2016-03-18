class UsersController < ApplicationController
  def show
    @user = User.find_by_id(params[:id])
  end

  def currentUser
    render json: current_user
  end
end