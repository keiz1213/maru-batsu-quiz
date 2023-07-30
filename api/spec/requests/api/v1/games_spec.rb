require 'rails_helper'

RSpec.describe 'Api::V1::Games' do
  RSpec::Matchers.define_negated_matcher :not_change, :change

  let(:user) { create(:user) }
  let(:valid_headers) { create_valid_headers(user) }
  let(:invalid_headers) { create_invalid_headers(user) }

  describe 'GET /api/v1/games/:game_id' do
    let(:game) { create(:game) }

    context 'when an authenticated user' do
      it 'loads a game' do
        get api_v1_game_path(game), headers: valid_headers
        expect(response.parsed_body['id']).to eq(game.id)
      end
    end

    context 'when an unauthenticated user' do
      it 'can not loads a game witn invalid id_token' do
        get api_v1_game_path(game), headers: invalid_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST /api/v1/games' do
    context 'when an authenticated user' do
      it 'create a game with quizzes' do
        expect do
          post api_v1_games_path, headers: valid_headers, params: game_with_quizzes_params(user)
        end.to change(Game, :count).by(1)
                                   .and change(Quiz, :count).by(2)
      end

      it 'can not create game without quizzes' do
        expect do
          post api_v1_games_path, headers: valid_headers, params: game_without_quizzes_params(user)
        end.not_to change(Game, :count)
      end
    end

    context 'when an unauthenticated user' do
      it 'can not create game whith invalid id_token' do
        expect do
          post api_v1_games_path, headers: invalid_headers, params: game_without_quizzes_params(user)
        end.not_to change(Game, :count)
      end
    end
  end

  describe 'PUT /api/v1/games/:game_id' do
    let(:game) { create(:game, :with_quizzes, user:) }
    let(:game_params) { game_with_quizzes_params(user) }

    context 'when an authenticated user' do
      it 'creater of the game can update the game' do
        game_title = game.title
        game_params[:game][:title] = 'update title'
        put api_v1_game_path(game), headers: valid_headers, params: game_params
        expect(Game.find(game.id).title).not_to eq(game_title)
      end

      it 'non creater of the game can not update the game' do
        game_title = game.title
        game_params[:game][:title] = 'update title'
        another_user = create(:user)
        put api_v1_game_path(game), headers: create_valid_headers(another_user), params: game_params
        expect(Game.find(game.id).title).to eq(game_title)
      end

      it 'can not update the game with invalid attributes' do
        game_title = game.title
        game_params[:game][:title] = nil
        put api_v1_game_path(game), headers: valid_headers, params: game_params
        expect(Game.find(game.id).title).to eq(game_title)
      end
    end

    context 'when an unauthenticated user' do
      it 'can not update the game with invalid id_token' do
        game_title = game.title
        game_params[:game][:title] = 'update title'
        put api_v1_game_path(game), headers: invalid_headers, params: game_params
        expect(Game.find(game.id).title).to eq(game_title)
      end
    end
  end

  describe 'DELETE /api/v1/games/:game_id' do
    let!(:game) { create(:game, :with_quizzes, user:) }

    context 'when an authenticated user' do
      it 'creater of the game can delete the game' do
        number_of_quizzes = game.quizzes.length
        expect do
          delete api_v1_game_path(game), headers: valid_headers
        end.to change(Game, :count).by(-1)
                                   .and change(Quiz, :count).by(-number_of_quizzes)
      end

      it 'non creater of the game can not delete the game' do
        another_user = create(:user)
        expect do
          delete api_v1_game_path(game), headers: create_valid_headers(another_user)
        end.to not_change(Game, :count)
          .and not_change(Quiz, :count)
      end
    end

    context 'when an unauthenticated user' do
      it 'game can not delete the game with invalid id_token' do
        expect do
          delete api_v1_game_path(game), headers: invalid_headers
        end.to not_change(Game, :count)
          .and not_change(Quiz, :count)
      end
    end
  end
end
