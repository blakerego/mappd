class LocationsController < ApplicationController

  def getAllLocations
    locations = Location.all
    render json: locations
  end

  def getLocationsByMap()
    render json: Map.find(params[:map_id]).locations
  end
end