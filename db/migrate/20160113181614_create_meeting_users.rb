class CreateMeetingUsers < ActiveRecord::Migration
  def change
    create_table :meeting_users do |t|
      t.integer :meeting_id
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
