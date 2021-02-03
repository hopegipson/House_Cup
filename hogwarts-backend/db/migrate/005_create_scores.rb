class CreateScores < ActiveRecord::Migration[6.0]
  def change
    create_table :scores do |t|
      t.integer :number_correct
      t.integer :house_points, default: 0
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
