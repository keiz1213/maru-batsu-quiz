class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.string :description, null: false
      t.integer :number_of_member, null: false
      t.string :channel_name, null: false

      t.timestamps
    end
    add_index :games, :user_id, unique: true
  end
end
