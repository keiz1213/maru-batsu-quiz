class Api::V1::GamesController < ApplicationController
  before_action :correct_user, only: %i[update destroy]

  def show
    game = Game.find(params[:id])
    render json: game.as_json(include: :quizzes), status: :ok
  end

  def create
    game = Game.new(game_params)
    build_quizzes(game)

    if game.save
      render json: game, status: :created
    else
      render json: { status: 'unprocessable_entity' }, status: :unprocessable_entity
    end
  end

  def update
    @game.quizzes.destroy_all
    build_quizzes(@game)

    if @game.update(update_game_params)
      render json: @game, status: :ok
    else
      render json: { status: 'unprocessable_entity' }, status: :unprocessable_entity
    end
  end

  def destroy
    @game.destroy
    render json: { status: 'no_content' }, status: :no_content
  end

  private

  def game_params
    params.require(:game).permit(
      :user_id,
      :title,
      :description,
      :number_of_winner,
      :channel_name
    )
  end

  def quizzes_params
    params.require(:quizzes).map do |quiz_params|
      quiz_params.permit(
        :question,
        :correct_answer,
        :explanation
      )
    end
  end

  def update_game_params
    params.require(:game).permit(
      :title,
      :description,
      :number_of_winner
    )
  end

  def build_quizzes(game)
    quizzes_params.each do |quiz_params|
      game.quizzes.build(quiz_params)
    end
  end

  def correct_user
    @game = current_user.games.find_by(id: params[:id])
    render json: { status: 'forbidden' }, status: :forbidden if @game.nil?
  end
end
