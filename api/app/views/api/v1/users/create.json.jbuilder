json.extract! @user, :id, :uid, :name, :avatar_url, :created_at, :updated_at

json.games @user.games do |game|
  json.extract! game, :id, :user_id, :title, :description, :number_of_winner
end
