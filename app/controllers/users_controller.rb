class UsersController < ApplicationController
	def index
		@users = User.all

	end

	def new
		@user = User.new
	end

	def create
		@user = User.new(user_params)
		if @user.save
			session[:remember_token] = @user.id.to_s
			@current_user = @user
			redirect_to @user
		else
			render 'new'
		end
	end
	def show
		@user = User.find(params[:id])
		@employees = @user.employees

	end

	def edit
		@user = User.find(params[:id])
	end

	def update
		@user = User.find(params[:id])
		if @user.update_attributes(user_params)
			redirect_to @user
		else
			render 'edit'
		end
	end


	private
	def user_params
		params.require(:user).permit(:username, :email, :password)
	end
end
