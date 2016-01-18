class Api::V1::MeetingsController < ApplicationController
  before_action :authenticate_user!

  def index
    @meetings = current_user.meetings
  end

  def show
    @meeting = Meeting.find_by(id: params[:id])
  end
end