class Api::V1::GamesController < ApplicationController
  def show
    game = Game.find(params[:id])
    render json: game.as_json(include: :quizzes)
  end

  def create
    game = Game.new(game_params)
    buildQuizzes(game)
    game.save
    render json: game.as_json(include: :quizzes)
  end

  def update
    game = Game.find(params[:id])
    rebuildQuizzes(game)
    game.update(game_params)
  end

  def destroy
    game = Game.find(params[:id])
    game.destroy
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

  def build_quizzes(game)
    params.require(:quizzes).each do |quiz|
      permitted_params = quiz.permit(
        :question,
        :correct_answer,
        :explanation
      )
      game.quizzes.build(permitted_params)
    end
  end

  def rebuild_quizzes(game)
    game.quizzes.destroy_all
    params.require(:quizzes).each do |quiz|
      permitted_params = quiz.permit(
        :question,
        :correct_answer,
        :explanation
      )
      game.quizzes.build(permitted_params)
    end
  end
end
