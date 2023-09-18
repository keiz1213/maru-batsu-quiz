class AddIndexToQuizzes < ActiveRecord::Migration[7.0]
  def change
    add_index :quizzes, :game_id
  end
end
