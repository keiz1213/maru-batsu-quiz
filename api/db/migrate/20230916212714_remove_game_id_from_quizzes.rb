class RemoveGameIdFromQuizzes < ActiveRecord::Migration[7.0]
  def change
    remove_column :quizzes, :game_id, :integer
  end
end
