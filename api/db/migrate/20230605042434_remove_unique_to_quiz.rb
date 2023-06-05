class RemoveUniqueToQuiz < ActiveRecord::Migration[7.0]
  def change
    remove_index :quizzes, :game_id
    add_index :quizzes, :game_id
  end
end
