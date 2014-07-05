class EmployeesController < ApplicationController
	before_action :authenticate_user
	before_action :set_user
	before_action :correct_user
	before_action :set_employee, only: [:show, :edit, :update, :destroy]
	
	def index
		@employees = @user.employees
		@employee = @user.employees.new

	end


	def new
		@employee = @user.employees.new
	end

	def create
		
		@employee = @user.employees.new(employee_params)
			respond_to do |format|
				if @employee.save
					format.html { redirect_to @user }
					format.js
					format.json { render json: @employee, status: :created, location: @employee }
				else
					format.html { render action: 'new' }
					# format.json { render json: @employee.errors, status: :unprocessable_entity }
				end
			end
	end

	def edit
	end

	def update
		if @employee.update_attributes(employee_params)
			redirect_to @user
		else
			render 'edit'
		end
	end
	
	def destroy
		@employee.destroy
		respond_to do |format|
			format.html { redirect_to @user }
			format.js
		end
	end

	private
	def set_user
		@user = User.find(params[:user_id])
	end
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
