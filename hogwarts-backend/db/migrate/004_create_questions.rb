class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.string :question
      t.text :answers
      t.string :correct_answer
      t.references :quiz, null: false, foreign_key: true
      t.timestamps
    end
  end
end
