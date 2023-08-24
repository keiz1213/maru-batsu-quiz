import { PlayerData } from '~/types/playerData'
import { ChatMessage } from '~/types/chatMessage'
import Avatar from '~/utils/class/Avatar'

export const usePlayerData = () => {
  const playerData = useState<PlayerData[]>('player-data', () => {
    return []
  })

  const addPlayerData = (data: PlayerData) => {
    playerData.value.push(data)
  }

  return {
    playerData,
    addPlayerData
  }
}

export const useMyAvatar = () => {
  const myAvatarId = useState<string>('my-avatar-id', () => {
    return ''
  })

  const setMyAvatarId = (avatarId: string) => {
    myAvatarId.value = avatarId
  }

  const isMyAvatar = (avatar: Avatar) => {
    return myAvatarId.value === avatar.avatarId
  }

  return {
    setMyAvatarId,
    isMyAvatar
  }
}

export const useOwner = () => {
  const owner = useState<Avatar | {}>('owner', () => {
    return {}
  })

  const addOwner = (ownerAvatar: Avatar) => {
    owner.value = ownerAvatar
  }

  return {
    owner,
    addOwner
  }
}

export const usePlayers = () => {
  const players = useState<Avatar[]>('players', () => {
    return []
  })

  const addPlayer = (player: Avatar) => {
    players.value.push(player)
  }

  const setAllPlayers = (allPlayers: Avatar[]) => {
    players.value = allPlayers
  }

  return {
    players,
    addPlayer,
    setAllPlayers
  }
}

export const useLosers = () => {
  const losers = useState<Avatar[]>('losers', () => {
    return []
  })

  const addLoser = (loser: Avatar) => {
    losers.value.push(loser)
  }

  return {
    losers,
    addLoser
  }
}

export const useWinners = () => {
  const winners = useState<Avatar[]>('winners', () => {
    return []
  })

  const addWinner = (winner: Avatar) => {
    winners.value.push(winner)
  }

  return {
    winners,
    addWinner
  }
}

export const useNumberOfWinner = () => {
  const numberOfWinner = useState<number>('number-of-winner', () => {
    return 0
  })

  const setNumberOfWinner = (initialNumberOfWinner: number) => {
    numberOfWinner.value = initialNumberOfWinner
  }

  const subtractNumberOfWinner = (subtractBy: number) => {
    numberOfWinner.value -= subtractBy
  }

  return {
    numberOfWinner,
    setNumberOfWinner,
    subtractNumberOfWinner
  }
}

export const useCurrentQuizNumber = () => {
  const currentQuizNumber = useState<number>('current-quiz-number', () => {
    return 0
  })

  const incrementCurrentQuizNumber = () => {
    currentQuizNumber.value++
  }

  return {
    currentQuizNumber,
    incrementCurrentQuizNumber
  }
}

export const useQuestionVisible = () => {
  const questionVisible = useState<boolean>('question-visible', () => {
    return false
  })

  const openQuestion = () => {
    questionVisible.value = true
  }

  const closeQuestion = () => {
    questionVisible.value = false
  }

  return {
    questionVisible,
    openQuestion,
    closeQuestion
  }
}

export const useGameState = () => {
  const standByGame = useState<boolean>('stand-by-game', () => {
    return true
  })

  const endOfGame = useState<boolean>('end-of-game', () => {
    return false
  })

  const startGame = () => {
    standByGame.value = false
  }

  const endGame = () => {
    endOfGame.value = true
  }

  return {
    standByGame,
    endOfGame,
    startGame,
    endGame
  }
}

export const useChat = () => {
  const chatVisible = useState<boolean>('chat-visible', () => {
    return false
  })

  const chatMessages = useState<ChatMessage[]>('chat-messages', () => {
    return []
  })

  const visible = () => {
    chatVisible.value = true
  }

  const inVisible = () => {
    chatVisible.value = false
  }

  const addChatMessage = (chatMessage: ChatMessage): void => {
    chatMessages.value.push(chatMessage)
  }

  return {
    chatVisible,
    chatMessages,
    visible,
    inVisible,
    addChatMessage
  }
}

export const useAnnounce = () => {
  const announceText = useState<string>('announce-text', () => {
    return ''
  })

  const updateAnnounceText = (text: string) => {
    announceText.value = text
  }

  return {
    announceText,
    updateAnnounceText
  }
}

export const useTimer = () => {
  const timeElapsed = useState<number>('time-elapsed', () => {
    return 0
  })

  const timerInterval = useState<any>('time-interval', () => {
    return null
  })

  const timeLimit = useState<number>('time-limit', () => {
    return 10
  })

  const startTimer = () => {
    timerInterval.value = setInterval(() => {
      if (++timeElapsed.value === timeLimit.value) {
        clearInterval(timerInterval.value)
      }
    }, 1000)
  }

  const resetTimer = (): void => {
    timeElapsed.value = 0
    timeLimit.value = 10
  }
  return {
    timeElapsed,
    timeLimit,
    startTimer,
    resetTimer
  }
}

export const useConnectionLoading = () => {
  const connectionLoading = useState<boolean>('connectionLoading', () => {
    return false
  })

  const setConnectionLoading = () => {
    connectionLoading.value = true
  }

  const clearConnectionLoading = () => {
    connectionLoading.value = false
  }

  return {
    connectionLoading,
    setConnectionLoading,
    clearConnectionLoading
  }
}

export const useQuizLoading = () => {
  const quizLoading = useState<boolean>('quizLoading', () => {
    return false
  })

  const setQuizLoading = () => {
    quizLoading.value = true
  }

  const clearQuizLoading = () => {
    quizLoading.value = false
  }

  return {
    quizLoading,
    setQuizLoading,
    clearQuizLoading
  }
}

export const useConnectionProgress = () => {
  const connectionProgress = useState<number>('connectionProgress', () => {
    return 0
  })

  const addProgress = (progress: number) => {
    connectionProgress.value += progress
  }

  return {
    connectionProgress,
    addProgress
  }
}
