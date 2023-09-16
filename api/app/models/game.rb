class Game < ApplicationRecord
  belongs_to :user
  has_many :quizzes, dependent: :destroy
  accepts_nested_attributes_for :quizzes

  validates :title, presence: true
  validates :description, presence: true
  validates :number_of_winner, presence: true, numericality: { only_integer: true }
  validates :channel_name, presence: true, uniqueness: true

  def build_quizzes(quizzes_params)
    quizzes_params.each do |quiz_params|
      quizzes.build(quiz_params)
    end
  end
end
