class User < ApplicationRecord
  has_many :games, dependent: :destroy

  validates :uid, presence: true, uniqueness: true
  validates :name, presence: true
  validates :avatar_url, presence: true
end
