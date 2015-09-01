class Map < ActiveRecord::Base
  has_many :mapLocations
  has_many :locations, :through => :mapLocations
end
