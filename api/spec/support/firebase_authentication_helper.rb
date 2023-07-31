module FirebaseAuthenticationHelper
  # rubocop:disable RSpec/AnyInstance
  def authenticated_user_stub(user)
    allow_any_instance_of(ApplicationController).to receive(:authenticate_user!).and_return(user)
  end
  # rubocop:enable RSpec/AnyInstance

  def user_stub_from_id_token(user)
    allow(FirebaseIdToken::Certificates).to receive(:request).and_return(true)
    allow(FirebaseIdToken::Signature).to receive(:verify).and_return(
      'sub' => user.uid,
      'name' => user.name,
      'picture' => user.avatar_url
    )
  end
end
