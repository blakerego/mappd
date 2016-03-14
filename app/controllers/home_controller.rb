class HomeController < ApplicationController
  def home
    if current_user
      @user = current_user
    end
  end

  def index
    if current_user
      @user = current_user
      @locations = []

      if (!@user.foursquare_token.nil?)
        client = Foursquare2::Client.new(:oauth_token => @user.foursquare_token, :api_version => '20160227')
        @checkins = client.user_checkins.items

        @checkins.each do |checkin|
          l = Location.find_or_create_by_foursquare_venue_id(checkin.venue.id,
                                                             checkin.venue.name,
                                                             checkin.venue.location.lat,
                                                             checkin.venue.location.lng)
          @locations.push(l)
        end
      end
    end
  end

end
