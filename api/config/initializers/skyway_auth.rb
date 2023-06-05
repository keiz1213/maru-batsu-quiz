module SkywayAuth
  mattr_accessor :skyway_id
  self.skyway_id = ENV["SKYWAY_ID"]

  mattr_accessor :secret_key
  self.secret_key = ENV["SKYWAY_SECRET"]

  mattr_accessor :token_signature_algorithm
  self.token_signature_algorithm = "HS256"
end
