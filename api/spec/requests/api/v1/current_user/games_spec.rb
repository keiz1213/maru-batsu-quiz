require 'rails_helper'

RSpec.describe 'Api::V1::CurrentUser::Games' do
  let(:user) { create(:user) }
  let!(:games) { create_list(:game, 5, :with_quizzes, user:) }

  describe 'GET /api/v1/current_user/games' do
    context 'when an authenticated user' do
      it 'can get games of current_user' do
        authenticated_user_stub(user)
        number_of_games = games.length
        get api_v1_current_user_games_path
        expect(response.parsed_body.length).to eq(number_of_games)
      end
    end

    context 'when an unauthenticated user' do
      it 'can not get games of current_user without id_token' do
        get api_v1_current_user_games_path
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
