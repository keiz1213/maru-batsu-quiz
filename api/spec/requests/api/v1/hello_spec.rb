require 'rails_helper'

RSpec.describe 'Api::V1::Hello' do
  describe 'GET /api/v1/hello' do
    it 'returns Hello, World!' do
      expect(response.body).to eq 'Hello, World!'
    end
  end
end
