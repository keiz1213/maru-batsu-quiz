require 'rails_helper'

RSpec.describe 'Api::V1::Users', type: :request do
  describe 'GET /api/v1/users/:user_id' do
    let(:user) { create(:user) }
    let(:valid_headers) {{
      Authorization: create_valid_token(user)
    }}
    let(:invalid_headers) {{
      Authorization: create_invalid_token(user)
    }}

    context 'as an authenticated user' do
      it 'loads a user' do
        get api_v1_user_path(user), headers: valid_headers
        expect(response).to have_http_status(200)
        expect(JSON.parse(response.body)['uid']).to eq(user.uid)
      end
    end

    context 'as an unauthenticated user' do
      it 'returns status 401 (unauthorized)' do
        get api_v1_user_path(user), headers: invalid_headers
        expect(response).to have_http_status(401)
      end
    end
  end

  describe 'POST /api/v1/users' do
    let(:user) { build(:user) }
    let(:valid_headers) {{
      Authorization: create_valid_token(user)
    }}
    let(:invalid_headers) {{
      Authorization: create_invalid_token(user)
    }}

    context 'as an authenticated user' do
      it 'create a user' do
        expect {
          post api_v1_users_path, headers: valid_headers
        }.to change(User, :count).by(1)
        expect(response).to have_http_status(200)
      end

      it 'find a user' do
        user = create(:user)
        id_token = create_valid_token(user)
        headers = {
          Authorization: id_token
        }
        expect {
          post api_v1_users_path, headers: headers
        }.not_to change(User, :count)
        expect(response).to have_http_status(200)
        expect(JSON.parse(response.body)['uid']).to eq(user.uid)
      end

      it "when the user has not registered a name on GitHub create a user with the name 'anonymous'" do
        user.name = nil
        id_token = create_valid_token(user)
        headers = {
          Authorization: id_token
        }
        expect {
          post api_v1_users_path, headers: headers
        }.to change(User, :count).by(1)
        expect(response).to have_http_status(200)
        expect(JSON.parse(response.body)['name']).to eq('anonymous')
      end

      it "can not create a user with invalid attributes" do
        user.avatar_url = nil
        id_token = create_valid_token(user)
        headers = {
          Authorization: id_token
        }
        expect {
          post api_v1_users_path, headers: headers
        }.not_to change(User, :count)
        expect(response).to have_http_status(422)
      end
    end

    context 'as an unauthenticated user' do
      it 'returns status 401 (unauthorized)' do
        expect {
          post api_v1_users_path, headers: invalid_headers
        }.not_to change(User, :count)
        expect(response).to have_http_status(401)
      end
    end
  end

  describe 'DELETE /api/v1/users/:user_id' do
    let!(:user) { create(:user) }
    let!(:valid_headers) {{
      Authorization: create_valid_token(user)
    }}
    let!(:invalid_headers) {{
      Authorization: create_invalid_token(user)
    }}

    context 'as an authenticated user' do
      it 'only the owner can delete a user' do
        expect {
          delete api_v1_user_path(user), headers: valid_headers
        }.to change(User, :count).by(-1)
        expect(response).to have_http_status(204)
      end

      it 'can not delete user by another_user' do
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

    context 'as an unauthenticated user' do
      it 'returns status 401 (unauthorized)' do
        expect {
          delete api_v1_user_path(user), headers: invalid_headers
        }.not_to change(User, :count)
        expect(response).to have_http_status(401)
      end
    end
  end
end
