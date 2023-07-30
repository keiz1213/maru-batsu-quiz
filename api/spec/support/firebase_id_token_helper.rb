require 'jwt'

module FirebaseIdTokenHelper
  def create_valid_headers(user)
    {
      Authorization: create_valid_token(user)
    }
  end

  def create_invalid_headers(user)
    {
      Authorization: create_invalid_token(user)
    }
  end

  def create_valid_token(user)
    payload = valid_payload.merge({ sub: user.uid, name: user.name, picture: user.avatar_url })
    JWT.encode payload, OpenSSL::PKey::RSA.new(FirebaseIdToken::Testing::Certificates.private_key), 'RS256'
  end

  def create_invalid_token(user)
    payload = invalid_payload.merge({ sub: user.uid, name: user.name, picture: user.avatar_url })
    JWT.encode payload, OpenSSL::PKey::RSA.new(FirebaseIdToken::Testing::Certificates.private_key), 'RS256'
  end

  def valid_payload
    current_time = Time.now.to_i

    {
      'iss' => 'https://securetoken.google.com/marubatsu-quiz',
      'aud' => 'marubatsu-quiz',
      'auth_time' => current_time,
      'iat' => current_time - 3600,
      'exp' => current_time + 33_029_000_017
    }
  end

  def invalid_payload
    current_time = Time.now.to_i

    {
      'iss' => 'https://securetoken.google.com/marubatsu-quiz',
      'aud' => 'marubatsu-quiz',
      'auth_time' => current_time,
      'iat' => current_time,
      'exp' => current_time
    }
  end
end
