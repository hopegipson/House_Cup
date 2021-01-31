class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :patronus
      t.references :house, null: false, foreign_key: true, default: 0
      t.text :scores
      t.integer :highest_score, default: 0
      t.integer :house_points, default: 0
      t.timestamps
    end
  end
end
