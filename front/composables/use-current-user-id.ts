import type { User } from 'firebase/auth'
import { getCurrentUserId } from '~/utils/api/services/current-user-id'

export const useCurrentUserId = () => {
  const currentUserId = useState<number>('currentUserId', () => {
    return 0
  })

  const setCurrentUserId = (id: number) => {
    currentUserId.value = id
  }

  const clearCurrentUserId = () => {
    currentUserId.value = 0
  }

  const checkCurrentUserId = async (firebaseUser: User | null) => {
    if (firebaseUser) {
      const id = await getCurrentUserId()
      setCurrentUserId(id)
    } else {
      clearCurrentUserId()
    }
  }

  const isGameOwner = (gameOwnerId: number) => {
    return currentUserId.value === gameOwnerId
  }
  return {
    currentUserId,
    setCurrentUserId,
    clearCurrentUserId,
    checkCurrentUserId,
    isGameOwner
  }
}
