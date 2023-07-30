require 'rails_helper'

RSpec.describe 'Api::V1::CurrentUser::UserIds' do
  let(:user) { create(:user) }
  let(:valid_headers) { create_valid_headers(user) }
  let(:invalid_headers) { create_invalid_headers(user) }

  describe 'GET /api/v1/current_user/user_ids' do
    context 'when an authenticated user' do
      it 'can get user_id of current_user' do
        user_id = user.id
        get api_v1_current_user_user_id_path, headers: valid_headers
        expect(response.parsed_body).to eq(user_id)
      end
    end

    context 'when an unauthenticated user' do
      it 'can not user_id of current_user with invalid id_token' do
        get api_v1_current_user_user_id_path, headers: invalid_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
