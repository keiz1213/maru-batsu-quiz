require 'rails_helper'

RSpec.describe 'Api::V1::CurrentUser::UserIds', type: :request do
  let(:user) { create(:user) }
  let(:valid_headers) {{
    Authorization: create_valid_token(user)
  }}
  let(:invalid_headers) {{
    Authorization: create_invalid_token(user)
  }}

  describe 'GET /api/v1/current_user/user_ids' do
    context 'as an authenticated user' do
      it 'get user_id of current_user' do
        user_id = user.id
        get api_v1_current_user_user_id_path, headers: valid_headers
        expect(response).to have_http_status(200)
        expect(JSON.parse(response.body)).to eq (user_id)
      end
    end

    context 'as an unauthenticated user' do
      it 'returns status 401 (unauthorized)' do
        get api_v1_current_user_user_id_path, headers: invalid_headers
        expect(response).to have_http_status(401)
      end
    end
  end
end
