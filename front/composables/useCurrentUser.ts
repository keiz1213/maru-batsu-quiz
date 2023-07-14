import { User } from '@/types/User'

export const useCurrentUser = () => {
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

  const unsetCurrentUser = (): void => {
    currentUser.value = {
      id: 0,
      uid: '',
      name: '',
      avatar_url: '',
      games: [],
      token: ''
    }
  }

  const isLoggedIn = (): boolean => {
    return currentUser.value.id != 0
  }

  const isGameOwner = (ownerId: number): boolean => {
    return currentUser.value.id === ownerId
  }

  return {
    currentUser,
    unsetCurrentUser,
    setCurrentUser,
    isLoggedIn,
    isGameOwner
  }
}
