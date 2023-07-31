require 'rails_helper'

RSpec.describe 'Api::V1::SkywayTokens' do
  describe 'GET /api/v1/skyway_token' do
    let(:user) { create(:user) }

    context 'when an authenticated user' do
      it 'returns status 200 (ok)' do
        authenticated_user_stub(user)
        get api_v1_skyway_token_path
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when an unauthenticated user' do
      it 'returns status 401 (unauthorized)' do
        get api_v1_skyway_token_path
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
