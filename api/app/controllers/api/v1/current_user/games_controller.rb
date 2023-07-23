class Api::V1::CurrentUser::GamesController < ApplicationController
  def index
    games = current_user.games.order(updated_at: :desc)
    render json: games, status: :ok
  end
end
