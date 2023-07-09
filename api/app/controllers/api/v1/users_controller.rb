class Api::V1::UsersController < ApplicationController
  def create
    FirebaseIdToken::Certificates.request unless FirebaseIdToken::Certificates.present?
    raise ArgumentError, 'BadRequest Parameter' if payload.blank?

    user = User.find_or_initialize_by(uid: uid_from_payload) do |u|
      u.name = name_from_payload
      u.avatar_url = avatar_url_from_payload
    end

    if user.save
      user.update(name:) if user.name != name_from_payload
      user.update(avatar_url:) if user.avatar_url != avatar_url_from_payload
      render json: user.as_json(include: :games)
    else
      render json: { status: :unprocessable_entity }
    end
  end

  private

  def token_from_request_headers
    request.headers['Authorization']&.split&.last
  end

  def payload
    @payload ||= FirebaseIdToken::Signature.verify(token_from_request_headers)
  end

  def uid_from_payload
    payload['sub']
  end
  
  def name_from_payload
    payload['name']
  end
  
  def avatar_url_from_payload
    payload['picture']
  end
end
