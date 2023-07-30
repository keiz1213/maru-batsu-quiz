require 'rails_helper'

RSpec.describe Quiz do
  # pending "add some examples to (or delete) #{__FILE__}"
  it 'generates associated data from a factory' do
    quiz = FactoryBot.create(:quiz)
    puts "this quiz's game is #{quiz.game.inspect}"
    puts "this quiz's user is #{quiz.game.user.inspect}"
  end
end
