class Api::V1::UsersController < ApplicationController
  rescue_from ArgumentError, with: :render_unauthorized_error
  skip_before_action :authenticate_with_firebase_id_token!, only: %i[create]

  def create
    fetch_certificates
    raise ArgumentError, 'BadRequest Parameter' if payload.blank?

    name = name_from_payload || 'anonymous'

    user = User.find_or_initialize_by(uid: uid_from_payload)
    user.assign_attributes(
      name:,
      avatar_url: avatar_url_from_payload
    )

    if user.save
      render json: user.as_json(include: :games), status: :ok
    else
      render json: { status: 'unprocessable_entity' }, status: :unprocessable_entity
    end
  end

  def destroy
    user = User.find(params[:id])
    if user == current_user
      user.destroy
      render json: { status: 'no_content' }, status: :no_content
    else
      render json: { status: 'forbidden' }, status: :forbidden
    end
  end
end
