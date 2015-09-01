class MapLocation < ActiveRecord::Base
  belongs_to :map
  belongs_to :location
end
