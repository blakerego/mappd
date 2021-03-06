class Map < ActiveRecord::Base
  has_many :mapLocations
  has_many :locations, :through => :mapLocations
  belongs_to :user
  accepts_nested_attributes_for :locations
end
