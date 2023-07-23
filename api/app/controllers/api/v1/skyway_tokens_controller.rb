class Api::V1::SkywayTokensController < ApplicationController
  def show
    skyway_token = Skyway::SkywayAuthToken.new.token
    render json: skyway_token, status: :ok
  end
end
