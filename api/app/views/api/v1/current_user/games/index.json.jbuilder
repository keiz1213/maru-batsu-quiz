json.array! @games do |game|
  json.id game.id
  json.user_id game.user_id
  json.title game.title
  json.description game.description
  json.number_of_winner game.number_of_winner
  json.channel_name game.channel_name
  json.created_at game.created_at
  json.updated_at game.updated_at

  json.quizzes game.quizzes do |quiz|
    json.extract! quiz, :id, :question, :correct_answer, :explanation
  end
end
