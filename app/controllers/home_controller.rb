class HomeController < ApplicationController
  def home
    if current_user
      @user = current_user
    end
  end

  def index
    if current_user
      @user = current_user
      if (!@user.foursquare_token.nil?)
        client = Foursquare2::Client.new(:oauth_token => @user.foursquare_token, :api_version => '20160227')
        @checkins = client.user_checkins.items

        # For each checkin, we need to create a
        # row for location.
        # @checkins.each do |checkin|
        #   Location.create(:latitude  => checkIn.venue.location.lat,
        #                   :longitude => checkIn.venue.location.lng,
        #                   :name      => checkIn.venue.name)
        # end
      end
    end

  end
end
