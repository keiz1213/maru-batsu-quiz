require 'rails_helper'

RSpec.describe 'Api::V1::Users', type: :request do
  describe 'GET /api/v1/users/:user_id' do
    let(:user) { create(:user) }
    context 'as an authenticated user' do
      it 'loads a user' do
        id_token = create_valid_token(user)
        headers = {
          Authorization: id_token
        }
        get api_v1_user_path(user), headers: headers
        expect(response).to have_http_status(200)
        expect(JSON.parse(response.body)['uid']).to eq(user.uid)
      end
    end

    context 'as an unauthenticated user' do
      it 'returns status 401 (unauthorized)' do
        id_token = create_invalid_token(user)
        headers = {
          Authorization: id_token
        }
        get api_v1_user_path(user), headers: headers
        expect(response).to have_http_status(401)
      end
    end
  end

  describe 'POST /api/v1/users/' do
    let(:user) { build(:user) }

    context 'as an authenticated user' do
      it 'create a user' do
        id_token = create_valid_token(user)
        headers = {
          Authorization: id_token
        }
        expect do
          post api_v1_users_path, headers: headers
        end.to change(User, :count).by(1)
        expect(response).to have_http_status(200)
      end

      it 'find a user' do
        user = create(:user)
        id_token = create_valid_token(user)
        headers = {
          Authorization: id_token
        }
        expect do
          post api_v1_users_path, headers: headers
        end.not_to change(User, :count)
        expect(response).to have_http_status(200)
        expect(JSON.parse(response.body)['uid']).to eq(user.uid)
      end

      it "create a user with the name 'anonymous'" do
        user.name = nil
        id_token = create_valid_token(user)
        headers = {
          Authorization: id_token
        }
        post api_v1_users_path, headers: headers
        expect(response).to have_http_status(200)
        expect(JSON.parse(response.body)['name']).to eq('anonymous')
      end

      it "can not create user" do
        user.avatar_url = nil
        id_token = create_valid_token(user)
        headers = {
          Authorization: id_token
        }
        expect do
          post api_v1_users_path, headers: headers
        end.not_to change(User, :count)
        expect(response).to have_http_status(422)
      end
    end

    context 'as an unauthenticated user' do
      it 'returns status 401 (unauthorized)' do
        id_token = create_invalid_token(user)
        headers = {
          Authorization: id_token
        }
        expect do
          post api_v1_users_path, headers: headers
        end.not_to change(User, :count)
        expect(response).to have_http_status(401)
      end
    end
  end

  describe 'DELETE /api/v1/users/:user_id' do
    let(:user) { create(:user) }

    context 'as an authenticated user' do
      it 'delete a user' do
        id_token = create_valid_token(user)
        headers = {
          Authorization: id_token
        }
        expect do
          delete api_v1_user_path(user), headers: headers
        end.to change(User, :count).by(-1)
        expect(response).to have_http_status(204)
      end
    end

    context 'as an unauthenticated user' do
      it 'can not delete user' do
        another_user = create(:user)
        id_token = create_valid_token(another_user)
        headers = {
          Authorization: id_token
        }
        delete api_v1_user_path(user), headers: headers
        user.reload
        expect(user).to be_persisted
        expect(response).to have_http_status(403)
      end
    end
  end
end
