import { Game } from '~/types/game'

export const getCurrentUserGames = async (): Promise<Game[]> => {
  const { data, error } = await useCustomFetch(`/api/v1/current_user/games`, {
    method: 'get'
  })
  if (error.value) {
    throw new Error()
  } else {
    const games = data.value as Game[]
    return games
  }
}

export const getGame = async (gameId: string | number): Promise<Game> => {
  const { data, error } = await useCustomFetch(`/api/v1/games/${gameId}`, {
    method: 'get'
  })
  if (error.value) {
    throw new Error()
  } else {
    const game = data.value as Game
    return game
  }
}

export const postGame = async (userId: number, game: Game): Promise<Game> => {
  const { data, error } = await useCustomFetch(`/api/v1/games/`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      game: {
        user_id: userId,
        title: game.title,
        description: game.description,
        number_of_winner: game.number_of_winner,
        channel_name: Math.random().toString(32).substring(2)
      },
      quizzes: game.quizzes
    }
  })
  if (error.value) {
    throw new Error()
  } else {
    const createdGame = data.value as Game
    return createdGame
  }
}

export const putGame = async (game: Game): Promise<Game> => {
  const { data, error } = await useCustomFetch(`/api/v1/games/${game.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      game: {
        title: game.title,
        description: game.description,
        number_of_winner: game.number_of_winner
      },
      quizzes: game.quizzes
    }
  })
  if (error.value) {
    throw new Error()
  } else {
    const updatedGame = data.value as Game
    return updatedGame
  }
}

export const deleteGame = async (gameId: string | number): Promise<void> => {
  const { error } = await useCustomFetch(`/api/v1/games/${gameId}`, {
    method: 'delete'
  })
  if (error.value) {
    throw new Error()
  }
}
