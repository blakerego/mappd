class CreateMapLocations < ActiveRecord::Migration
  def change
    create_table :map_locations do |t|
      t.integer :map_id
      t.integer :location_id

      t.timestamps null: false
    end
  end
end
