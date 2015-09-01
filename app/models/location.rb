class Location < ActiveRecord::Base
  has_many :mapLocations
  has_many :maps, :through => :mapLocations
end
