require 'rails_helper'

RSpec.describe 'Api::V1::CurrentUser::Games', type: :request do
  let(:user) { create(:user) }
  let!(:games) { create_list(:game, 5, :with_quizzes, user: user) }
  let(:valid_headers) {{
    Authorization: create_valid_token(user)
  }}
  let(:invalid_headers) {{
    Authorization: create_invalid_token(user)
  }}

  describe 'GET /api/v1/current_user/games' do
    context 'as an authenticated user' do
      it 'get games of current_user' do
        number_of_games = user.games.length
        get api_v1_current_user_games_path, headers: valid_headers
        expect(response).to have_http_status(200)
        expect(JSON.parse(response.body).length).to eq (number_of_games)
      end
    end

    context 'as an unauthenticated user' do
      it 'returns status 401 (unauthorized)' do
        get api_v1_current_user_games_path, headers: invalid_headers
        expect(response).to have_http_status(401)
      end
    end
  end
end
