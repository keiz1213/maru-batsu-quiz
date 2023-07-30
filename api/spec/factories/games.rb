FactoryBot.define do
  factory :game do
    title { 'test-game' }
    description { 'it is test game' }
    number_of_winner { 1 }
    sequence(:channel_name) { |n| "test-channel-#{n}" }
    association :user
  end
end
