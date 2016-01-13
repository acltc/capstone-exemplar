class CreateMeetings < ActiveRecord::Migration
  def change
    create_table :meetings do |t|
      t.datetime :start_time
      t.datetime :end_time
      t.string :name
      t.string :address

      t.timestamps null: false
    end
  end
end
