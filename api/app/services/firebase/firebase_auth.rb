module Firebase
  module FirebaseAuth
    # rubocop:disable Rails/Blank
    def fetch_certificates
      FirebaseIdToken::Certificates.request unless FirebaseIdToken::Certificates.present?
    end
    # rubocop:enable Rails/Blank

    def token_from_request_headers
      request.headers['Authorization']&.split&.last
    end

    def payload
      @payload ||= FirebaseIdToken::Signature.verify(token_from_request_headers)
    end

    def uid_from_payload
      payload['sub']
    end

    def name_from_payload
      payload['name']
    end

    def avatar_url_from_payload
      payload['picture']
    end

    def authenticate_user!
      fetch_certificates
      raise ArgumentError, 'BadRequest Parameter' if payload.blank?

      user = User.find_by(uid: uid_from_payload)
      raise AuthenticationError, 'unauthorized' if user.nil?

      user
    end
  end
end
