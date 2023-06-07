class RemoveUniqueToGame < ActiveRecord::Migration[7.0]
  def change
    remove_index :games, :user_id
    add_index :games, :user_id
  end
end
