import { User } from '~/types/user'
import { Game } from '~/types/game'
import { postUser } from '~/utils/api/services/user'

export const useCurrentUser = () => {
  const currentUser = useState<User>('current-user', () => {
    return {
      id: 0,
      uid: '',
      name: '',
      avatar_url: '',
      games: []
    }
  })

  const isOwner = (game: Game | undefined) => {
    return currentUser.value.id === game?.user_id
  }

  const setCurrentUserStore = (user: User) => {
    currentUser.value = user
  }

  const clearCurrentUserStore = () => {
    currentUser.value = {
      id: 0,
      uid: '',
      name: '',
      avatar_url: '',
      games: []
    }
  }

  const checkCurrentUserStore = async () => {
    const { isLoggedIn } = useFirebaseAuth()
    if (isLoggedIn.value && currentUser.value.id === 0) {
      const fetchedUser = await postUser()
      currentUser.value = fetchedUser
    }
  }

  return {
    currentUser,
    isOwner,
    setCurrentUserStore,
    clearCurrentUserStore,
    checkCurrentUserStore
  }
}
