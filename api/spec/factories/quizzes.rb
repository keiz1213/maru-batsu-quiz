FactoryBot.define do
  factory :quiz do
    question { 'test-question' }
    correct_answer { 'test-answer' }
    explanation { 'test-explanation' }
    association :game
  end
end
