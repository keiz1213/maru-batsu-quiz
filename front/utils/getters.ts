import { Game } from '@/types/Game'

export const getSkywayToken = async (
  firebaseIdToken: string
): Promise<string> => {
  const { data } = await useFetch('http://localhost:3001/api/v1/skyway_token', {
    method: 'post',
    headers: {
      authorization: `Bearer ${firebaseIdToken}`
    }
  })
  const skywayToken = data.value as string
  return skywayToken
}

export const getGame = async (gameId: string): Promise<Game> => {
  const { data } = await useFetch(
    `http://localhost:3001/api/v1/games/${gameId}`
  )
  const game = data.value as Game
  return game
}
