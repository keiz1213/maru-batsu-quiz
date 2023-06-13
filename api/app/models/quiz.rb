class Quiz < ApplicationRecord
  belongs_to :game

  validates :question, presence: true
  validates :correct_answer, presence: true
  validates :explanation, presence: true
  validates_associated :game
end
