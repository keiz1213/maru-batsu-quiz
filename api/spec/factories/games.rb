FactoryBot.define do
  factory :game do
    user_id { 1 }
    title { 'MyString' }
    description { 'MyString' }
    number_of_member { 1 }
    channel_name { 'MyString' }
  end
end
