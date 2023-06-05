class RenameNumberOfMemberColumnToGames < ActiveRecord::Migration[7.0]
  def change
    rename_column :games, :number_of_member, :number_of_winner
  end
end
