class CreateQuizzes < ActiveRecord::Migration[7.0]
  def change
    create_table :quizzes do |t|
      t.integer :game_id, null: false
      t.string :question, null: false
      t.string :correct_answer, null: false
      t.string :explanation, null: false

      t.timestamps
    end
    add_index :quizzes, :game_id, unique: true
  end
end
