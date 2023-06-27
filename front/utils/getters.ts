import { Game } from '@/types/Game'

export const getGame = async (gameId: string): Promise<Game> => {
  const { data } = await useMyFetch(`/api/v1/games/${gameId}`)
  const game = data.value as Game
  return game
}
