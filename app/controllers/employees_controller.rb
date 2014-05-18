class EmployeesController < ApplicationController
	
	# def index
	# 	@employees = Employee.all
	# end
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
		@employee = current_user.employees.find(params[:id])
	end

	def update
		@employee = current_user.employees.find(params[:id])
		if @employee.update_attributes(employee_params)
			redirect_to current_user
		else
			render 'edit'
		end
	end
	
	def destroy
		@employee = current_user.employees.find(params[:id])
		@employee.destroy
		redirect_to current_user
	end

	private
	def employee_params
		params.require(:employee).permit(:name, :ssn, :hiring_date, :prob_expire, :act_insure, :ann_review, :birthday)
	end

end
