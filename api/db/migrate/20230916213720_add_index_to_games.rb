class AddIndexToGames < ActiveRecord::Migration[7.0]
  def change
    add_index :games, :user_id
  end
end
