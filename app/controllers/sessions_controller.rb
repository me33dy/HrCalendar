class SessionsController < ApplicationController
	def new
	end
	def create
		@user = User.where(:email => params[:session][:email]).first
		if @user && @user.authenticate(params[:session][:password])
			session[:remember_token] = @user.id.to_s
			@current_user = @user
			redirect_to user_employees_path(@user)
		else
			render 'new'
		end
	end
	def destroy
		session.delete(:remember_token)
		redirect_to :root
	end

end
