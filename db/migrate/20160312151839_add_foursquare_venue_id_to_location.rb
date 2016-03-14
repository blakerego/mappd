class AddFoursquareVenueIdToLocation < ActiveRecord::Migration
  def change
    add_column :locations, :foursquare_venue_id, :string
  end
end
