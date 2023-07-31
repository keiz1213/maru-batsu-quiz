require 'rails_helper'

RSpec.describe 'Api::V1::CurrentUser::UserIds' do
  let(:user) { create(:user) }

  describe 'GET /api/v1/current_user/user_ids' do
    context 'when an authenticated user' do
      it 'can get user_id of current_user' do
        authenticated_user_stub(user)
        user_id = user.id
        get api_v1_current_user_user_id_path
        expect(response.parsed_body).to eq(user_id)
      end
    end

    context 'when an unauthenticated user' do
      it 'can not user_id of current_user without id_token' do
        get api_v1_current_user_user_id_path
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
