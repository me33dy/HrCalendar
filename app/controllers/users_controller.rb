class UsersController < ApplicationController
	before_action :authenticate_user, except: [:new, :create]
	before_action :correct_user, only: [:edit, :update, :show]
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
		set_user
		@employees = @user.employees

	end

	def edit
		set_user
	end

	def update
		set_user
		if @user.update_attributes(user_params)
			redirect_to @user
		else
			render 'edit'
		end
	end
	def preview
		@employees = current_user.employees
	end


	private
	def set_user
		@user = User.find(params[:id])
	end

	def user_params
		params.require(:user).permit(:username, :email, :password)
	end
	def correct_user
		redirect_to new_sessions_path unless current_user == User.find(params[:id])
	end
end
