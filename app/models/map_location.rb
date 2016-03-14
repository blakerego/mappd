###################################################
# create_table "map_locations", force: :cascade do |t|
#   t.integer  "map_id"
#   t.integer  "location_id"
#   t.datetime "created_at",  null: false
#   t.datetime "updated_at",  null: false
# end
###################################################

class MapLocation < ActiveRecord::Base
  belongs_to :map
  belongs_to :location
end
