module Firebase
  module FirebaseAuth
    def request_certificates
      # rubocop:disable Rails/Blank
      FirebaseIdToken::Certificates.request unless FirebaseIdToken::Certificates.present?
      # rubocop:enable Rails/Blank
    end

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
  end
end
