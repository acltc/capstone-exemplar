class Meeting < ActiveRecord::Base
  has_many :meeting_users
  has_many :users, through: :meeting_users

  geocoded_by :address
  after_validation :geocode

  def display_members
    users.map { |user| user.email }.join(" | ")
  end
end
