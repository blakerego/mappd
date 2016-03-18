class LocationsController < ApplicationController

  def getAllLocations
    locations = Location.all
    render json: locations
  end
end