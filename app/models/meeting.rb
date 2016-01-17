class Meeting < ActiveRecord::Base
  has_many :meeting_users
  has_many :users, through: :meeting_users

  geocoded_by :address
  after_validation :geocode
end
