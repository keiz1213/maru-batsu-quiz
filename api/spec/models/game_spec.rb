require 'rails_helper'

RSpec.describe 'Game' do
  describe 'build_quizzes' do
    it 'can associate quizzes with the game by building them from quizzes_params' do
      game = create(:game)
      quizzes_params = [{ 'question' => 'test-question', 'correct_answer' => '◯', 'explanation' => 'test-explanation' }]
      game.build_quizzes(quizzes_params)
      expect(game.quizzes[0].game_id).to eq(game.id)
    end
  end
end
