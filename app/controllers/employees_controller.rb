class EmployeesController < ApplicationController
	before_action :correct_user
	
	def new
		@employee = current_user.employees.new
	end

	def create
		
		@employee = current_user.employees.new(employee_params)
		if @employee.save
			redirect_to current_user
		else
			render 'new'
		end
	end

	def edit
		set_employee
	end

	def update
		set_employee
		if @employee.update_attributes(employee_params)
			redirect_to current_user
		else
			render 'edit'
		end
	end
	
	def destroy
		set_employee
		@employee.destroy
		redirect_to current_user
	end

	private
	def set_employee
		@employee = current_user.employees.find(params[:id])
	end
	def employee_params
		params.require(:employee).permit(:name, :ssn, :hiring_date, :prob_expire, :act_insure, :ann_review, :birthday)
	end
	def correct_user
		redirect_to new_sessions_path unless current_user == User.find(params[:user_id])
	end

end
