class Api::V1::CurrentUser::GamesController < ApplicationController
  def index
    games = current_user.games.includes(:quizzes).order(updated_at: :desc)
    render json: games.as_json(include: :quizzes), status: :ok
  end
end
