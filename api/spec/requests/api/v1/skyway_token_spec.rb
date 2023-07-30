require 'rails_helper'

RSpec.describe 'Api::V1::SkywayTokens' do
  describe 'GET /api/v1/skyway_token' do
    let(:user) { create(:user) }
    let(:valid_headers) { create_valid_headers(user) }
    let(:invalid_headers) { create_invalid_headers(user) }

    context 'when an authenticated user' do
      it 'returns status 200 (ok)' do
        get api_v1_skyway_token_path, headers: valid_headers
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when an unauthenticated user' do
      it 'returns status 401 (unauthorized)' do
        get api_v1_skyway_token_path, headers: invalid_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
