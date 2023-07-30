FactoryBot.define do
  factory :user do
    sequence(:uid) { |n| "uid-#{n}" }
    name { 'test-user' }
    avatar_url { 'https://example.com/u/72614612?v=4' }
  end
end
