module SessionsHelper

	def current_user
		if session[:remember_token]
		@current_user = User.find(session[:remember_token])
		else
		false
		end
	end
end
