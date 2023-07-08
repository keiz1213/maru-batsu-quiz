import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth'
import { User } from '@/types/User'

export const useAuth = () => {
  const getUser = async (firebaseToken: string): Promise<User> => {
    const { data } = await useMyFetch('/api/v1/users', {
      method: 'post',
      headers: {
        authorization: `Bearer ${firebaseToken}`
      }
    })
    const user = data.value as User
    return user
  }

  const initializeCurrentUser = (): void => {
    currentUser.value = {
      id: 0,
      uid: '',
      name: '',
      avatar_url: '',
      games: [],
      token: ''
    }
  }

  const setCurrentUser = (acquiredUser: User, firebaseToken: string): void => {
    currentUser.value = {
      id: acquiredUser.id,
      uid: acquiredUser.uid,
      name: acquiredUser.name,
      avatar_url: acquiredUser.avatar_url,
      games: acquiredUser.games,
      token: firebaseToken
    }
  }

  const currentUser = useState<User>('currentUser', () => {
    return {
      id: 0,
      uid: '',
      name: '',
      avatar_url: '',
      games: [],
      token: ''
    }
  })

  const githubLogin = async (): Promise<void> => {
    const auth = getAuth()
    const provider = new GithubAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const firebaseToken = await result.user.getIdToken()
    const user = await getUser(firebaseToken)
    setCurrentUser(user, firebaseToken)
  }

  const signOut = async (): Promise<void> => {
    const auth = getAuth()
    await firebaseSignOut(auth)
    initializeCurrentUser()
  }

  const checkAuthState = async (): Promise<void> => {
    return await new Promise<void>((resolve) => {
      const auth = getAuth()
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log('只今login中ですので維持します by checkAuthState')
          const firebaseToken = await user.getIdToken()
          const loggedInUser = await getUser(firebaseToken)
          setCurrentUser(loggedInUser, firebaseToken)
          resolve()
        } else {
          console.log('すでにlogoutしています by checkAuthState')
          initializeCurrentUser()
          resolve()
        }
      })
    })
  }

  const isLoggedIn = (): boolean => {
    return currentUser.value.id != 0
  }

  return { githubLogin, signOut, checkAuthState, isLoggedIn, currentUser }
}
