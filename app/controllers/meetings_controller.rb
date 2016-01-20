class MeetingsController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_owner!, only: [:edit, :update, :destroy]

  def index
    @meetings = current_user.meetings
  end

  def new
    @meeting = Meeting.new
    @members = User.where('id != ?', current_user.id)
  end

  def create
    @meeting = Meeting.create(
      name: params[:name],
      address: params[:address],
      start_time: params[:start_time],
      end_time: params[:end_time],
      user_id: current_user.id
    )
    member_ids = params[:meeting][:user_ids] + [current_user.id]
    member_ids.each do |member_id|
      next if member_id == ""
      MeetingUser.create(
        meeting_id: @meeting.id,
        user_id: member_id
      )
    end
    redirect_to "/meetings/#{@meeting.id}"
  end

  def show
    @meeting = Meeting.find_by(id: params[:id])
  end

  def edit
    @meeting = Meeting.find_by(id: params[:id])
    @members = User.where('id != ?', current_user.id)
  end

  def update
    @meeting = Meeting.find_by(id: params[:id])
    @meeting.update(
      name: params[:name],
      address: params[:address],
      start_time: params[:start_time],
      end_time: params[:end_time]
    )
    @meeting.meeting_users.destroy_all
    params[:meeting][:user_ids].each do |member_id|
      next if member_id == ""
      MeetingUser.create(
        meeting_id: @meeting.id,
        user_id: member_id
      )
    end
    redirect_to "/meetings/#{@meeting.id}"
  end

  private

  def authorize_owner!
    meeting = Meeting.find_by(id: params[:id])
    unless current_user.created_meeting? meeting
      flash[:alert] = "You do not have permission to modify this meeting!"
      redirect_to '/meetings'
    end
  end
end
