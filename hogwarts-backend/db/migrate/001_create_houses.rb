class CreateHouses < ActiveRecord::Migration[6.0]
  def change
    create_table :houses do |t|
      t.string :name
      t.string :image
      t.string :crest
      t.string :color
      t.integer :points, default: 0

      t.timestamps
    end
  end
end
