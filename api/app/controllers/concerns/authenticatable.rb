module Authenticatable
  include Firebase::FirebaseAuth

  def authenticate_with_firebase_id_token!
    raise AuthenticationError if unauthorized?
  end

  def current_user
    authenticate_user!
  rescue AuthenticationError, ArgumentError
    nil
  end

  def unauthorized?
    current_user.nil?
  end
end
