class Api::V1::UsersController < ApplicationController
  include Firebase::FirebaseAuth

  def show
    request_certificates
    raise ArgumentError, 'BadRequest Parameter' if payload.blank?

    user = User.find_by(uid: params[:uid])
    render json: user.as_json(include: :games)
  end

  def create
    request_certificates
    raise ArgumentError, 'BadRequest Parameter' if payload.blank?

    user = User.find_or_create_by(uid: uid_from_payload) do |u|
      u.name = name_from_payload
      u.avatar_url = avatar_url_from_payload
    end
    render json: user.as_json(include: :games)
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
  end
end
