class Api::V1::HelloController < ApplicationController
  skip_before_action :authenticate_with_firebase_id_token!, only: %i[index]
  def index
    render json: 'Hello, World!'
  end
end
