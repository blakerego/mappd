###################################################
# create_table "locations", force: :cascade do |t|
#   t.string   "address"
#   t.float    "latitude"
#   t.float    "longitude"
#   t.string   "name"
#   t.string   "type"
#   t.datetime "created_at", null: false
#   t.datetime "updated_at", null: false
#   t.string   "foursquare_venue_id"
# end

### Locations may come from a number of datasources.
### For now, we will limit the options to 
### either Foursquare or Google.

###################################################

class Location < ActiveRecord::Base
  has_many :mapLocations
  has_many :maps, :through => :mapLocations


  def self.find_or_create_by_foursquare_venue_id (id, name = nil, latitude = nil, longitude = nil)
    found = Location.find_by_foursquare_venue_id(id)
    if found
      return found
    else
      return Location.create(:foursquare_venue_id => id, :latitude => latitude, :longitude => longitude, :name => name)
    end
  end


  # May want a batch create / update operation

end
