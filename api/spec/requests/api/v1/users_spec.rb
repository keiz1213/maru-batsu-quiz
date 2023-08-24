require 'rails_helper'

RSpec.describe 'Api::V1::Users' do
  describe 'POST /api/v1/users' do
    let(:new_user) { build(:user) }

    context 'when an authenticated user' do
      it 'can create a user' do
        user_stub_from_id_token(new_user)
        expect do
          post api_v1_users_path
        end.to change(User, :count).by(1)
      end

      it 'can find a user' do
        old_user = create(:user)
        user_stub_from_id_token(old_user)
        post api_v1_users_path
        expect(response.parsed_body['id']).to eq(old_user.id)
      end

      it "when the user not registered a name on GitHub create a user with the name 'anonymous'" do
        new_user.name = nil
        user_stub_from_id_token(new_user)
        post api_v1_users_path
        expect(response.parsed_body['name']).to eq('anonymous')
      end

      it 'can not create a user with invalid attributes' do
        new_user.avatar_url = nil
        user_stub_from_id_token(new_user)
        expect do
          post api_v1_users_path(new_user)
        end.not_to change(User, :count)
      end
    end

    context 'when an unauthenticated user' do
      it 'can not create a user without id_token' do
        expect do
          post api_v1_users_path
        end.not_to change(User, :count)
      end
    end
  end

  describe 'DELETE /api/v1/users/:user_id' do
    let!(:user) { create(:user) }

    context 'when an authenticated user' do
      it 'only the owner can delete a user' do
        authenticated_user_stub(user)
        expect do
          delete api_v1_user_path(user)
        end.to change(User, :count).by(-1)
      end

      it 'can not delete a user by another_user' do
        another_user = create(:user)
        authenticated_user_stub(another_user)
        expect do
          delete api_v1_user_path(user)
        end.not_to change(User, :count)
      end
    end

    context 'when an unauthenticated user' do
      it 'can not delete a user without id_token' do
        expect do
          delete api_v1_user_path(user)
        end.not_to change(User, :count)
      end
    end
  end
end
