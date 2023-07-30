FactoryBot.define do
  factory :quiz do
    question { 'test-question' }
    correct_answer { '◯' }
    explanation { 'test-explanation' }
    association :game
  end
end
