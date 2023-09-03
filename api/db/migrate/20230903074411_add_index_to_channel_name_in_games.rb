class AddIndexToChannelNameInGames < ActiveRecord::Migration[7.0]
  def change
    add_index :games, :channel_name, unique: true
  end
end
