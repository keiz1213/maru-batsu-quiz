import { Game } from '@/types/Game'
import { User } from '@/types/User'

export const getGame = async (gameId: string): Promise<Game> => {
  const { data } = await useMyFetch(`/api/v1/games/${gameId}`)
  const game = data.value as Game
  return game
}

export const getOrCreateUser = async (firebaseToken: string): Promise<User> => {
  const { data } = await useMyFetch('/api/v1/users', {
    method: 'post',
    headers: {
      authorization: `Bearer ${firebaseToken}`
    }
  })
  const user = data.value as User
  return user
}

export const getUser = async (
  uid: string,
  firebaseToken: string
): Promise<User> => {
  const { data } = await useMyFetch(`/api/v1/users/${uid}`, {
    method: 'get',
    headers: {
      authorization: `Bearer ${firebaseToken}`
    }
  })
  const user = data.value as User
  return user
}
