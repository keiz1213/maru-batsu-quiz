import { Game } from '~/types/game'
import { getGames } from '~/utils/api/services/game'

export const useGame = () => {
  const games = useState<Game[]>('games', () => {
    return []
  })

  const addGameStore = (game: Game) => {
    games.value.push(game)
  }

  const setGamesStore = (games: Game[]) => {
    games.forEach((game) => addGameStore(game))
  }

  const clearGamesStore = () => {
    games.value = []
  }

  const resetGamesStore = async () => {
    clearGamesStore()
    const fetchedGames = await getGames()
    setGamesStore(fetchedGames)
  }

  const getGameStore = (id: number) => {
    const game = games.value.find((game) => game.id === id)
    return game
  }

  const checkGamesStore = async () => {
    const { isLoggedIn } = useFirebaseAuth()
    if (isLoggedIn.value && games.value.length === 0) {
      const fetchedGames = await getGames()
      setGamesStore(fetchedGames)
    }
  }

  return {
    games,
    setGamesStore,
    clearGamesStore,
    resetGamesStore,
    getGameStore,
    checkGamesStore
  }
}
