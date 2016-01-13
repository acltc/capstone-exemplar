class LandingPageController < ApplicationController
  layout "devise"

  def index
    if current_user
      redirect_to '/meetings'
    end
  end
end
