class AddForeignKeyToQuizzes < ActiveRecord::Migration[7.0]
  def change
    add_column :quizzes, :game_id, :integer, null: false
    add_foreign_key :quizzes, :games, column: :game_id
  end
end
