class Api::V1::SkywayTokenController < ApplicationController
  def create
    # token = request.headers['Authorization']&.split&.last
    # payload = FirebaseIdToken::Signature.verify token
    # return unless payload

    skyway_token = SkywayAuth::AuthToken.new.token
    render json: skyway_token
  end
end
