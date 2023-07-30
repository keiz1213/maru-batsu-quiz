require 'rails_helper'

RSpec.describe 'Api::V1::Users' do
  describe 'GET /api/v1/users/:user_id' do
    let(:user) { create(:user) }
    let(:valid_headers) { create_valid_headers(user) }
    let(:invalid_headers) { create_invalid_headers(user) }

    context 'when an authenticated user' do
      it 'can loads a user' do
        get api_v1_user_path(user), headers: valid_headers
        expect(response.parsed_body['id']).to eq(user.id)
      end
    end

    context 'when an unauthenticated user' do
      it 'can not loads a user with invalid id_token' do
        get api_v1_user_path(user), headers: invalid_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST /api/v1/users' do
    let(:new_user) { build(:user) }
    let(:valid_headers) { create_valid_headers(new_user) }
    let(:invalid_headers) { create_invalid_headers(new_user) }

    context 'when an authenticated user' do
      it 'can create a user' do
        expect do
          post api_v1_users_path, headers: valid_headers
        end.to change(User, :count).by(1)
      end

      it 'can find a user' do
        old_user = create(:user)
        expect do
          post api_v1_users_path, headers: create_valid_headers(old_user)
        end.not_to change(User, :count)
      end

      it "when the user not registered a name on GitHub create a user with the name 'anonymous'" do
        new_user.name = nil
        post api_v1_users_path, headers: create_valid_headers(new_user)
        expect(response.parsed_body['name']).to eq('anonymous')
      end

      it 'can not create a user with invalid attributes' do
        new_user.avatar_url = nil
        expect do
          post api_v1_users_path, headers: create_valid_headers(new_user)
        end.not_to change(User, :count)
      end
    end

    context 'when an unauthenticated user' do
      it 'can not create a user with invalid id_token' do
        expect do
          post api_v1_users_path, headers: invalid_headers
        end.not_to change(User, :count)
      end
    end
  end

  describe 'DELETE /api/v1/users/:user_id' do
    let!(:user) { create(:user) }
    let(:valid_headers) { create_valid_headers(user) }
    let(:invalid_headers) { create_invalid_headers(user) }

    context 'when an authenticated user' do
      it 'only the owner can delete a user' do
        expect do
          delete api_v1_user_path(user), headers: valid_headers
        end.to change(User, :count).by(-1)
      end

      it 'can not delete a user by another_user' do
        another_user = create(:user)
        delete api_v1_user_path(user), headers: create_valid_headers(another_user)
        user.reload
        expect(user).to be_persisted
      end
    end

    context 'when an unauthenticated user' do
      it 'can not delete a user with invalid id_token' do
        expect do
          delete api_v1_user_path(user), headers: invalid_headers
        end.not_to change(User, :count)
      end
    end
  end
end
