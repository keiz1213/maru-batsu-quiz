module GameSpecHelper
  # rubocop:disable Metrics/MethodLength
  def game_with_quizzes_params(user)
    {
      game: {
        user_id: user.id,
        title: 'title',
        description: 'description',
        number_of_winner: 1,
        channel_name: 'channel_name'
      },
      quizzes: [
        {
          question: 'question',
          correct_answer: 'correct_answer',
          explanation: 'explanation'
        },
        {
          question: 'question',
          correct_answer: 'correct_answer',
          explanation: 'explanation'
        }
      ]
    }
  end
  # rubocop:enable Metrics/MethodLength

  def game_without_quizzes_params(user)
    {
      game: {
        user_id: user.id,
        title: 'title',
        description: 'description',
        number_of_winner: 1,
        channel_name: 'channel_name'
      },
      quizzes: [
        {
          question: nil,
          correct_answer: nil,
          explanation: nil
        }
      ]
    }
  end
end
