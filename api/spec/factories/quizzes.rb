FactoryBot.define do
  factory :quiz do
    game_id { 1 }
    question { 'MyString' }
    correct_answer { 'MyString' }
    explanation { 'MyString' }
  end
end
