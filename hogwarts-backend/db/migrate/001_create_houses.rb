class CreateHouses < ActiveRecord::Migration[6.0]
  def change
    create_table :houses do |t|
      t.string :name
      t.string :image
      t.string :crest
      t.string :primary_color
      t.string :secondary_color
      t.string :mascot
      t.string :element
      t.text :house_information
      t.string :small_summary
      t.string :traits
      t.integer :points, default: 0
      t.string :picture
      t.timestamps
    end
  end
end
