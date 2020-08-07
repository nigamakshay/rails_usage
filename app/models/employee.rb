class Employee < ApplicationRecord

  validate :name_required

  def name_required
    if not name.present?
      errors.add(:name, "is required")
    end  
  end

end
