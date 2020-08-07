class EmployeesCrud < ApplicationService
 
  include MessageConstants
  
  def initialize(params)
    @params = params
  end

  def call()
    return { success: true } if @params.blank? or (@params[:employees].blank? and @params[:employeesDeleted].blank?)

    begin       
      ActiveRecord::Base.transaction do  
        @params[:employees] && @params[:employees].values.each do |params|        
          Employee.find_or_initialize_by(:id => params[:id]).update!(params)
        end

        @params[:employeesDeleted] && @params[:employeesDeleted].each do |employee_id|  
          Employee.find(employee_id).destroy
        end

      end
      { success: true }

    rescue ActiveRecord::RecordInvalid => e    
      Rails.logger.error("#{EMP_CRUD_FAILED}, error: #{e}, employees: #{employees}");
      { success: false, error: e, employees: employees }
    end
  
  end

end