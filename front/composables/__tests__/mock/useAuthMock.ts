import { vi } from 'vitest'

type FirebaseUser = {
  uid: string
  name: string
  photoURL: string
}

const useAuthMock = vi.fn(() => {
  return {
    user: {
      value: {
        uid: 'testUid',
        name: 'testUser',
        photoURL: 'https://example.com/photo.jpg'
      } as FirebaseUser | null
    },
    isLoggedIn: true
  }
})

export default useAuthMock
