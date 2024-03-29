class API::V1::GamesController < ApplicationController
  before_action :correct_user, only: %i[update destroy]

  def show
    @game = Game.find(params[:id])
  end

  def create
    @game = Game.new(game_params)
    @game.build_quizzes(quizzes_params)

    if @game.save
      render 'show', status: :created
    else
      render json: { status: 'unprocessable_entity' }, status: :unprocessable_entity
    end
  end

  def update
    @game.quizzes.destroy_all
    @game.build_quizzes(quizzes_params)

    if @game.update(update_game_params)
      render 'show', status: :ok
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

  def correct_user
    @game = current_user.games.find_by(id: params[:id])
    render json: { status: 'forbidden' }, status: :forbidden if @game.nil?
  end
end
