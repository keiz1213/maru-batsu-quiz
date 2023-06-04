class Api::V1::UsersController < ApplicationController
  include ActionController::HttpAuthentication::Token::ControllerMethods

  def create
    # FirebaseIdToken::Certificates.request!
    token = request.headers['Authorization']&.split&.last
    payload = FirebaseIdToken::Signature.verify(token)
    uid = payload['sub']
    name = payload['name']
    avatar_url = payload['picture']
    user = User.find_or_initialize_by(uid:) do |u|
      u.name = name
      u.avatar_url = avatar_url
    end
    user.games
    if user.save
      user.update(name:) if user.name != name
      user.update(avatar_url:) if user.avatar_url != avatar_url
      render json: user.as_json(include: :games)
    else
      render json: { status_code: 422 }
    end
  end
end
