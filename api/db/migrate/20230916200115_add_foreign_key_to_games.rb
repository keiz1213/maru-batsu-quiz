class AddForeignKeyToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :user_id, :integer, null: false
    add_foreign_key :games, :users, column: :user_id
  end
end
