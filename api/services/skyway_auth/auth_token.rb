require 'jwt'
require 'securerandom'

module SkywayAuth
  class AuthToken
    attr_reader :token

    def initialize
      @token = JWT.encode(payload, secret_key, algorithm, header_fields)
    end

    private

    def skyway_id
      SkywayAuth.skyway_id
    end

    def secret_key
      SkywayAuth.secret_key
    end

    def iat
      Time.now.to_i
    end

    def exp
      Time.now.to_i + 36_000 # 60*60*10
    end

    def algorithm
      SkywayAuth.token_signature_algorithm
    end

    def header_fields
      { typ: 'JWT' }
    end

    # rubocop:disable Metrics/MethodLength
    def payload
      {
        jti: SecureRandom.uuid,
        iat:,
        exp:,
        scope: {
          app: {
            id: skyway_id,
            turn: true,
            actions: ['read'],
            channels: [
              {
                id: '*',
                name: '*',
                actions: ['write'],
                members: [
                  {
                    id: '*',
                    name: '*',
                    actions: ['write'],
                    publication: {
                      actions: ['write']
                    },
                    subscription: {
                      actions: ['write']
                    }
                  }
                ],
                sfuBots: [
                  {
                    actions: ['write'],
                    forwardings: [
                      {
                        actions: ['write']
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      }
    end
    # rubocop:enable Metrics/MethodLength
  end
end
