json.extract! @game, :id, :user_id, :title, :description, :number_of_winner, :channel_name, :created_at, :updated_at

json.quizzes @game.quizzes do |quiz|
  json.extract! quiz, :id, :question, :correct_answer, :explanation
end
