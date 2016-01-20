class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :meeting_users
  has_many :meetings, through: :meeting_users

  has_many :created_meetings, class_name: "Meeting", foreign_key: "user_id"
end
