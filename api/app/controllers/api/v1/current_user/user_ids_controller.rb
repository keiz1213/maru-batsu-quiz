class Api::V1::CurrentUser::UserIdsController < ApplicationController
  def show
    user_id = current_user.id
    render json: user_id, status: :ok
  end
end
