# Error module to Handle errors globally
# include Error::ErrorHandler in application_controller.rb

module Error
  module ErrorHandler
    def self.included(clazz)
      clazz.class_eval do
        rescue_from ActiveRecord::RecordNotFound do |e|
          respond(:record_not_found, 404, e.to_s, :not_found)
        end

        rescue_from ActiveRecord::RecordNotUnique do |e|
          respond("Record not unique", 409, e.to_s, :unprocessable_entity)
        end

      end

    end

    private
    def respond(error, status, message, status_code)
      json = Helpers::Render.json(error, status, message)
      render json: json, status: status_code
    end
  end
end