require 'rails_helper'

RSpec.describe 'Api::V1::SkywayTokens' do
  describe 'GET /api/v1/skyway_token' do
    let(:user) { create(:user) }
    let(:valid_headers) {{
      Authorization: create_valid_token(user)
    }}
    let(:invalid_headers) {{
      Authorization: create_invalid_token(user)
    }}

    context 'as an authenticated user' do
      it 'returns status 200 (ok)' do
        get api_v1_skyway_token_path, headers: valid_headers
        expect(response).to have_http_status(200)
      end
    end

    context 'as an unauthenticated user' do
      it 'returns status 401 (unauthorized)' do
        get api_v1_skyway_token_path, headers: invalid_headers
        expect(response).to have_http_status(401)
      end
    end
  end
end
