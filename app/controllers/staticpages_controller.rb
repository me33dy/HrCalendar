class StaticpagesController < ApplicationController
	before_action :return_user
	def home
	end

	private
	def return_user
		if current_user
			redirect_to user_employees_path(current_user)
		end
	end
end
