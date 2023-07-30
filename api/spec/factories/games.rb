FactoryBot.define do
  factory :game do
    title { 'test-game' }
    description { 'it is test game' }
    number_of_winner { 1 }
    sequence(:channel_name) { |n| "test-channel-#{n}" }
    association :user

    trait :with_quizzes do
      after(:create) { |game| create_list(:quiz, 3, game: game)}
    end
  end
end
