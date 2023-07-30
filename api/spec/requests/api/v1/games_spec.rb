require 'rails_helper'

RSpec.describe 'Api::V1::Games', type: :request do
  RSpec::Matchers.define_negated_matcher :not_change, :change

  let(:user) { create(:user) }
  let(:valid_headers) {{
    Authorization: create_valid_token(user)
  }}
  let(:invalid_headers) {{
    Authorization: create_invalid_token(user)
  }}

  describe 'GET /api/v1/games/:game_id' do
    let(:game) { create(:game) }

    context 'as an authenticated user' do
      it 'loads a game' do
        get api_v1_game_path(game), headers: valid_headers
        expect(response).to have_http_status(200)
        expect(JSON.parse(response.body)['id']).to eq(game.id)
      end
    end

    context 'as an unauthenticated user' do
      it 'returns status 401 (unauthorized)' do
        get api_v1_game_path(game), headers: invalid_headers
        expect(response).to have_http_status(401)
      end
    end
  end

  describe 'POST /api/v1/games' do

    context 'as an authenticated user' do
      it 'create a game with quizzes' do
        expect {
          post api_v1_games_path, headers: valid_headers, params: {
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
        }.to change(Game, :count).by(1)
         .and change(Quiz, :count).by(2)
        expect(response).to have_http_status(200)
      end

      it 'cannot create game without quizzes' do
        expect {
          post api_v1_games_path, headers: valid_headers, params: {
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
        }.not_to change(Game, :count)
        expect(response).to have_http_status(422)
      end
    end

    context 'as an unauthenticated user' do
      it 'returns status 401 (unauthorized)' do
        post api_v1_games_path, headers: invalid_headers
        expect(response).to have_http_status(401)
      end
    end
  end

  describe 'PUT /api/v1/games/:game_id' do
    let(:game) { create(:game, :with_quizzes, user: user) }

    context 'as an authenticated user' do
      it 'creater of the game can update the game' do
        quizzes_params = [
          {
            question: 'update question',
            correct_answer: '✕',
            explanation: 'update explanation'
          }
        ]
        before_update_attributes = {
          title: game.title,
          description: game.description,
          number_of_winner: game.number_of_winner,
          number_of_quiz: game.quizzes.length
        }
        after_update_number_of_quiz = quizzes_params.length

        put api_v1_game_path(game), headers: valid_headers, params: {
          game: {
            title: 'update title',
            description: 'update description',
            number_of_winner: 3
          },
          quizzes: quizzes_params
        }
        expect(response).to have_http_status(200)

        json_response = JSON.parse(response.body)

        expect(json_response['id']).to eq(game.id)
        expect(json_response['title']).not_to eq(before_update_attributes[:title])
        expect(json_response['description']).not_to eq(before_update_attributes[:description])
        expect(json_response['number_of_winner']).not_to eq(before_update_attributes[:number_of_winner])
        expect(before_update_attributes[:number_of_quiz]).not_to eq(after_update_number_of_quiz)
      end

      it 'non creater of the game can not update the game' do
        game_title = game.title
        another_user = create(:user)
        headers = {
          Authorization: create_valid_token(another_user)
        }
        put api_v1_game_path(game), headers: headers, params: {
          game: {
            title: 'update title',
            description: 'update description',
            number_of_winner: 3
          },
          quizzes: [
            {
              question: 'update question',
              correct_answer: '✕',
              explanation: 'update explanation'
            }
          ]
        }
        expect(response).to have_http_status(403)
        expect(Game.find(game.id).title).to eq(game_title)
      end

      it 'can not update the game with invalid attributes' do
        game_title = game.title
        put api_v1_game_path(game), headers: invalid_headers, params: {
          game: {
            title: nil,
            description: 'update description',
            number_of_winner: 3
          },
          quizzes: [
            {
              question: 'update question',
              correct_answer: '✕',
              explanation: 'update explanation'
            }
          ]
        }
        expect(response).to have_http_status(401)
        expect(Game.find(game.id).title).to eq(game_title)
      end
    end

    context 'as an unauthenticated user' do
      it 'returns status 401 (unauthorized)' do
        game_title = game.title
        put api_v1_game_path(game), headers: invalid_headers, params: {
          game: {
            title: 'update title',
            description: 'update description',
            number_of_winner: 3
          },
          quizzes: [
            {
              question: 'update question',
              correct_answer: '✕',
              explanation: 'update explanation'
            }
          ]
        }
        expect(response).to have_http_status(401)
        expect(Game.find(game.id).title).to eq(game_title)
      end
    end
  end

  describe 'DELETE /api/v1/games/:game_id' do
    let!(:game) { create(:game, :with_quizzes, user: user) }

    context 'as an authenticated user' do
      it 'creater of the game can delete the game' do
        number_of_quizzes = game.quizzes.length
        expect {
          delete api_v1_game_path(game), headers: valid_headers
        }.to change(Game, :count).by(-1)
         .and change(Quiz, :count).by(-number_of_quizzes)
        expect(response).to have_http_status(204)
      end

      it 'non creater of the game can not delete the game' do
        another_user = create(:user)
        id_token = create_valid_token(another_user)
        headers = {
          Authorization: id_token
        }
        expect {
          delete api_v1_game_path(game), headers: headers
        }.to not_change(Game, :count)
         .and not_change(Quiz, :count)
        expect(response).to have_http_status(403)
      end
    end

    context 'as an unauthenticated user' do
      it 'returns status 401 (unauthorized)' do
        expect {
          delete api_v1_game_path(game), headers: invalid_headers
        }.to not_change(Game, :count)
         .and not_change(Quiz, :count)
        expect(response).to have_http_status(401)
      end
    end
  end
end
