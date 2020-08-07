class EmployeesController < ApplicationController
  
  layout "employees"
  include MessageConstants
  
  def index
    @employees = Employee.all.to_json
  end

  def show
    @employees = Employee.all
  end

  def save
    result = EmployeesCrud.call(params[:data])
    
    if result[:success]
      render json: { message: EMP_SAVED, employees: Employee.all }, status: :ok
    else
      render json: { message: EMP_NOT_SAVED, error: "#{result[:error]}", employees: result[:employees] }, status: :unprocessable_entity
    end

  end
end
