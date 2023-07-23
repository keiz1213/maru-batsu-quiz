class ApplicationController < ActionController::API
  include Authenticatable
  rescue_from AuthenticationError, with: :render_unauthorized_error

  before_action :authenticate_with_firebase_id_token!

  def render_unauthorized_error
    render json: { status: 'unauthorized' }, status: :unauthorized
  end
end
