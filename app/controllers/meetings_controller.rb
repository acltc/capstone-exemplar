class MeetingsController < ApplicationController
  def index
    @meetings = current_user.meetings
  end
end
