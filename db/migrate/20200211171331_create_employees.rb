class CreateEmployees < ActiveRecord::Migration[5.2]
  def change
    create_table :employees do |t|
      t.string :name
      t.integer :gender, :limit => 1
      t.integer :designation, :limit => 1      
      t.integer :department, :limit => 1
      t.date :date_of_joining
      t.timestamps
    end
  end
end
