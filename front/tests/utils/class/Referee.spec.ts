// @vitest-environment nuxt
import { expect, it, vi } from 'vitest'
import Avatar from '~/utils/class/Avatar'
import PlayerAvatar from '~/utils/class/PlayerAvatar'
import Referee from '~/utils/class/Referee'
import SyncDraggable from '~/utils/class/SyncDraggable'

afterEach(() => {
  vi.restoreAllMocks()
})

const game = {
  user_id: 1,
  id: 1,
  channel_name: 'test name',
  title: 'Test Game',
  description: 'This is a test game',
  quizzes: [
    {
      question: '1 + 1 = 2 ?',
      correct_answer: '◯',
      explanation: '普通に2です'
    },
    {
      question: '2 + 2 = 5 ?',
      correct_answer: '✕',
      explanation: '普通に4です'
    }
  ],
  number_of_winner: 1,
  created_at: '2023-08-04T12:34:56Z',
  updated_at: '2023-08-04T14:22:33Z'
}

const game2 = {
  user_id: 1,
  id: 2,
  channel_name: 'test name',
  title: 'Test Game',
  description: 'This is a test game',
  quizzes: [
    {
      question: '1 + 1 = 2 ?',
      correct_answer: '◯',
      explanation: '普通に2です'
    },
    {
      question: '2 + 2 = 5 ?',
      correct_answer: '✕',
      explanation: '普通に4です'
    }
  ],
  number_of_winner: 2,
  created_at: '2023-08-04T12:34:56Z',
  updated_at: '2023-08-04T14:22:33Z'
}

const avatar = {
  avatarId: 'avatar-1',
  avatarName: 'test-avatar',
  avatarImage: 'https://avatars.githubusercontent.com/u/72614612?v=4',
  avatarIndex: null,
  skywayChannel: null,
  skywayDataStream: null,
  venueActivity: null
} as PlayerAvatar

const avatar2 = {
  avatarId: 'avatar-2',
  avatarName: 'test-avatar',
  avatarImage: 'https://avatars.githubusercontent.com/u/72614612?v=4',
  avatarIndex: null,
  skywayChannel: null,
  skywayDataStream: null,
  venueActivity: null
} as PlayerAvatar

const avatar3 = {
  avatarId: 'avatar-3',
  avatarName: 'test-avatar',
  avatarImage: 'https://avatars.githubusercontent.com/u/72614612?v=4',
  avatarIndex: null,
  skywayChannel: null,
  skywayDataStream: null,
  venueActivity: null
} as PlayerAvatar

const mocks = vi.hoisted(() => {
  return {
    startGame: vi.fn(),
    endGame: vi.fn(),
    notifyOnSpot: vi.fn(),
    fireWorks: vi.fn()
  }
})

vi.mock('~/composables/venue-states', async () => {
  const actual = (await vi.importActual('~/composables/venue-states')) as Object
  return {
    ...actual,
    useGameState: () => {
      return {
        startGame: mocks.startGame,
        endGame: mocks.endGame
      }
    }
  }
})

vi.mock('~/composables/use-toast', () => {
  return {
    useToast: () => {
      return {
        notifyOnSpot: mocks.notifyOnSpot
      }
    }
  }
})

vi.mock('~/utils/cracker', () => {
  return {
    fireWorks: mocks.fireWorks
  }
})

const draggable = new SyncDraggable()

it('when a referee instance is created, the number of winners is set.', () => {
  const { numberOfWinner } = useNumberOfWinner()
  expect(numberOfWinner.value).toBe(0)
  new Referee(game, draggable)
  expect(numberOfWinner.value).toBe(1)
})

it('can start game', () => {
  const referee = new Referee(game, draggable)
  const setDraggableSpy = vi.spyOn(draggable, 'setDraggable')
  const setDropzoneSpy = vi.spyOn(draggable, 'setDropzone')

  referee.startGame(avatar)
  expect(setDraggableSpy).toHaveBeenCalledWith(avatar)
  expect(setDropzoneSpy).toHaveBeenCalledWith('maru', avatar)
  expect(setDropzoneSpy).toHaveBeenCalledWith('batsu', avatar)
  expect(mocks.startGame).toHaveBeenCalledOnce()
  expect(mocks.notifyOnSpot).toHaveBeenCalledWith(
    '接続が完了しました。ゲームを開始できます。',
    'success'
  )
})

describe('checkEndOfGame', () => {
  describe('when number of winner is 0', () => {
    it('game ends', () => {
      const referee = new Referee(game, draggable)
      const { numberOfWinner } = useNumberOfWinner()
      numberOfWinner.value = 0

      referee.checkEndOfGame()
      expect(numberOfWinner.value).toBe(0)
      expect(mocks.endGame).toHaveBeenCalledOnce()
      expect(mocks.fireWorks).toHaveBeenCalledOnce()
    })
  })

  describe('when number of winner is not 0', () => {
    it('game continues', () => {
      const referee = new Referee(game, draggable)
      const { numberOfWinner } = useNumberOfWinner()

      referee.checkEndOfGame()
      expect(numberOfWinner.value).toBe(1)
      expect(mocks.endGame).not.toHaveBeenCalledOnce()
      expect(mocks.fireWorks).not.toHaveBeenCalledOnce()
    })
  })
})

it('can convert characters into symbols.', () => {
  const referee = new Referee(game, draggable)
  const symbolCircle = referee.convert('maru')
  const symbolCross = referee.convert('batsu')
  const none = referee.convert('foo')
  expect(symbolCircle).toBe('◯')
  expect(symbolCross).toBe('✕')
  expect(none).toBe('')
})

describe('checkLoser', () => {
  describe('when the player provides an incorrect answer,', () => {
    it('player is determined as a loser.', () => {
      document.body.innerHTML = `
      <div id="${avatar.avatarId}" data-state="" class="z-10" data-answer="maru" style="width: 50px; height: 50px;">
      </div>
    `
      const referee = new Referee(game, draggable)
      const correctAnswer = game.quizzes[1].correct_answer
      expect(referee.checkLoser(avatar, correctAnswer)).toBeTruthy()
    })
  })

  describe("when the player didn't provide any answer", () => {
    it('player is determined as a loser.', () => {
      document.body.innerHTML = `
      <div id="${avatar.avatarId}" data-state="" class="z-10" data-answer="" style="width: 50px; height: 50px;">
      </div>
    `
      const referee = new Referee(game, draggable)
      const correctAnswer = game.quizzes[1].correct_answer
      expect(referee.checkLoser(avatar, correctAnswer)).toBeTruthy()
    })
  })
})

describe('checkWinner', () => {
  describe('when the player provides an correct answer,', () => {
    it('player is determined as a winner.', () => {
      document.body.innerHTML = `
      <div id="${avatar.avatarId}" data-state="" class="z-10" data-answer="maru" style="width: 50px; height: 50px;">
      </div>
    `
      const referee = new Referee(game, draggable)
      const correctAnswer = game.quizzes[0].correct_answer
      expect(referee.checkWinner(avatar, correctAnswer)).toBeTruthy()
    })
  })
})

describe('addLoser', () => {
  it('can add loser to losers', () => {
    document.body.innerHTML = `
        <div id="${avatar.avatarId}" data-state="" class="z-10" data-answer="" style="width: 50px; height: 50px;">
        </div>
      `
    const referee = new Referee(game, draggable)
    const unsetDraggableSpy = vi.spyOn(draggable, 'unsetDraggable')
    const { losers } = useLosers()
    expect(losers.value).toHaveLength(0)

    referee.addLoser(avatar)
    const element = document.getElementById(avatar.avatarId) as HTMLElement
    expect(element.dataset.state).toBe('loser')
    expect(unsetDraggableSpy).toHaveBeenCalledWith(avatar)
    expect(losers.value).toHaveLength(1)
    losers.value = []
  })
})

describe('addWinner', () => {
  it('can add winner to winners', () => {
    document.body.innerHTML = `
        <div id="${avatar.avatarId}" data-state="" class="z-10" data-answer="" style="width: 50px; height: 50px;">
        </div>
      `
    const referee = new Referee(game, draggable)
    const unsetDraggableSpy = vi.spyOn(draggable, 'unsetDraggable')
    const { winners } = useWinners()
    expect(winners.value).toHaveLength(0)

    referee.addWinner(avatar)
    const element = document.getElementById(avatar.avatarId) as HTMLElement
    expect(element.dataset.state).toBe('winner')
    expect(winners.value).toHaveLength(1)
    expect(unsetDraggableSpy).toHaveBeenCalledWith(avatar)
    winners.value = []
  })
})

describe('getLosersFromPlayers', () => {
  afterEach(() => {
    const { players } = usePlayers()
    players.value = []
  })

  describe('when there are two players, one answers correctly, and the other answers incorrectly', () => {
    it('can get a loser from two players', () => {
      document.body.innerHTML = `
          <div id="${avatar.avatarId}" data-state="" class="z-10" data-answer="maru" style="width: 50px; height: 50px;">
          </div>

          <div id="${avatar2.avatarId}" data-state="" class="z-10" data-answer="batsu" style="width: 50px; height: 50px;">
          </div>
        `
      const referee = new Referee(game, draggable)
      const { addPlayer } = usePlayers()
      addPlayer(avatar)
      addPlayer(avatar2)
      const correctAnswer = game.quizzes[0].correct_answer

      const losers = referee.getLosersFromPlayers(correctAnswer)
      expect(losers).toHaveLength(1)
      expect(losers[0]).toEqual(avatar2)
    })
  })

  describe('when there are two players, and both of them answer incorrectly', () => {
    it('can get two losers from two players', () => {
      document.body.innerHTML = `
          <div id="${avatar.avatarId}" data-state="" class="z-10" data-answer="batsu" style="width: 50px; height: 50px;">
          </div>

          <div id="${avatar2.avatarId}" data-state="" class="z-10" data-answer="batsu" style="width: 50px; height: 50px;">
          </div>
        `
      const referee = new Referee(game, draggable)
      const { addPlayer } = usePlayers()
      addPlayer(avatar)
      addPlayer(avatar2)
      const correctAnswer = game.quizzes[0].correct_answer

      const losers = referee.getLosersFromPlayers(correctAnswer)
      expect(losers).toHaveLength(2)
      expect(losers[0]).toEqual(avatar)
      expect(losers[1]).toEqual(avatar2)
    })
  })

  describe('when there are two players, and both of them answer correctly', () => {
    it('can not get losers from two players', () => {
      document.body.innerHTML = `
          <div id="${avatar.avatarId}" data-state="" class="z-10" data-answer="maru" style="width: 50px; height: 50px;">
          </div>

          <div id="${avatar2.avatarId}" data-state="" class="z-10" data-answer="maru" style="width: 50px; height: 50px;">
          </div>
        `
      const referee = new Referee(game, draggable)
      const { addPlayer } = usePlayers()
      addPlayer(avatar)
      addPlayer(avatar2)
      const correctAnswer = game.quizzes[0].correct_answer

      const losers = referee.getLosersFromPlayers(correctAnswer)
      expect(losers).toHaveLength(0)
    })
  })
})

describe('getWinnersFromPlayers', () => {
  afterEach(() => {
    const { players } = usePlayers()
    players.value = []
  })

  describe('when there are two players, one answers correctly, and the other answers incorrectly', () => {
    it('can get a winner from two players', () => {
      document.body.innerHTML = `
          <div id="${avatar.avatarId}" data-state="" class="z-10" data-answer="maru" style="width: 50px; height: 50px;">
          </div>

          <div id="${avatar2.avatarId}" data-state="" class="z-10" data-answer="batsu" style="width: 50px; height: 50px;">
          </div>
        `
      const referee = new Referee(game, draggable)
      const { addPlayer } = usePlayers()
      addPlayer(avatar)
      addPlayer(avatar2)
      const correctAnswer = game.quizzes[0].correct_answer

      const winners = referee.getWinnersFromPlayers(correctAnswer)
      expect(winners).toHaveLength(1)
      expect(winners[0]).toEqual(avatar)
    })
  })

  describe('when there are two players, and both of them answer correctly', () => {
    it('can get two winners from two players', () => {
      document.body.innerHTML = `
          <div id="${avatar.avatarId}" data-state="" class="z-10" data-answer="maru" style="width: 50px; height: 50px;">
          </div>

          <div id="${avatar2.avatarId}" data-state="" class="z-10" data-answer="maru" style="width: 50px; height: 50px;">
          </div>
        `
      const referee = new Referee(game, draggable)
      const { addPlayer } = usePlayers()
      addPlayer(avatar)
      addPlayer(avatar2)
      const correctAnswer = game.quizzes[0].correct_answer

      const winners = referee.getWinnersFromPlayers(correctAnswer)
      expect(winners).toHaveLength(2)
      expect(winners[0]).toEqual(avatar)
      expect(winners[1]).toEqual(avatar2)
    })
  })

  describe('when there are two players, and both of them answer incorrectly', () => {
    it('can not get winners from two players', () => {
      document.body.innerHTML = `
          <div id="${avatar.avatarId}" data-state="" class="z-10" data-answer="batsu" style="width: 50px; height: 50px;">
          </div>

          <div id="${avatar2.avatarId}" data-state="" class="z-10" data-answer="batsu" style="width: 50px; height: 50px;">
          </div>
        `
      const referee = new Referee(game, draggable)
      const { addPlayer } = usePlayers()
      addPlayer(avatar)
      addPlayer(avatar2)
      const correctAnswer = game.quizzes[0].correct_answer

      const winners = referee.getWinnersFromPlayers(correctAnswer)
      expect(winners).toHaveLength(0)
    })
  })
})

describe('judge', () => {
  afterEach(() => {
    const { players } = usePlayers()
    const { winners } = useWinners()
    const { losers } = useLosers()
    players.value = []
    winners.value = []
    losers.value = []
  })

  describe('when number of winner is one, and there are three players', () => {
    it('if one answer correctly and two answer incorrectly, the game ends', () => {
      document.body.innerHTML = `
          <div id="${avatar.avatarId}" data-state="" class="z-10" data-answer="maru" style="width: 50px; height: 50px;">
          </div>

          <div id="${avatar2.avatarId}" data-state="" class="z-10" data-answer="batsu" style="width: 50px; height: 50px;">
          </div>

          <div id="${avatar3.avatarId}" data-state="" class="z-10" data-answer="batsu" style="width: 50px; height: 50px;">
          </div>
        `
      const referee = new Referee(game, draggable)
      const { winners } = useWinners()
      const { losers } = useLosers()
      const { addPlayer } = usePlayers()
      addPlayer(avatar)
      addPlayer(avatar2)
      addPlayer(avatar3)
      const correctAnswer = game.quizzes[0].correct_answer

      referee.judge(correctAnswer)
      expect(winners.value).toHaveLength(1)
      expect(losers.value).toHaveLength(2)
      expect(mocks.endGame).toHaveBeenCalledOnce()
      expect(mocks.fireWorks).toHaveBeenCalledOnce()
    })

    it('if two answers correctly and one answer incorrectly, the game continues', () => {
      document.body.innerHTML = `
          <div id="${avatar.avatarId}" data-state="" class="z-10" data-answer="maru" style="width: 50px; height: 50px;">
          </div>

          <div id="${avatar2.avatarId}" data-state="" class="z-10" data-answer="maru" style="width: 50px; height: 50px;">
          </div>

          <div id="${avatar3.avatarId}" data-state="" class="z-10" data-answer="batsu" style="width: 50px; height: 50px;">
          </div>
        `
      const referee = new Referee(game, draggable)
      const { winners } = useWinners()
      const { losers } = useLosers()
      const { addPlayer } = usePlayers()
      addPlayer(avatar)
      addPlayer(avatar2)
      addPlayer(avatar3)
      const correctAnswer = game.quizzes[0].correct_answer

      referee.judge(correctAnswer)
      expect(winners.value).toHaveLength(0)
      expect(losers.value).toHaveLength(1)
      expect(mocks.endGame).not.toHaveBeenCalledOnce()
      expect(mocks.fireWorks).not.toHaveBeenCalledOnce()
    })

    it('if all answers incorrectly, the game continues', () => {
      document.body.innerHTML = `
          <div id="${avatar.avatarId}" data-state="" class="z-10" data-answer="batsu" style="width: 50px; height: 50px;">
          </div>

          <div id="${avatar2.avatarId}" data-state="" class="z-10" data-answer="batsu" style="width: 50px; height: 50px;">
          </div>

          <div id="${avatar3.avatarId}" data-state="" class="z-10" data-answer="batsu" style="width: 50px; height: 50px;">
          </div>
        `
      const referee = new Referee(game, draggable)
      const { winners } = useWinners()
      const { losers } = useLosers()
      const { addPlayer } = usePlayers()
      addPlayer(avatar)
      addPlayer(avatar2)
      addPlayer(avatar3)
      const correctAnswer = game.quizzes[0].correct_answer

      referee.judge(correctAnswer)
      expect(winners.value).toHaveLength(0)
      expect(losers.value).toHaveLength(0)
      expect(mocks.endGame).not.toHaveBeenCalledOnce()
      expect(mocks.fireWorks).not.toHaveBeenCalledOnce()
    })
  })

  describe('when number of winner is two, and there are three players', () => {
    it('if one answer correctly and two answer incorrectly, the game continues', () => {
      document.body.innerHTML = `
          <div id="${avatar.avatarId}" data-state="" class="z-10" data-answer="maru" style="width: 50px; height: 50px;">
          </div>

          <div id="${avatar2.avatarId}" data-state="" class="z-10" data-answer="batsu" style="width: 50px; height: 50px;">
          </div>

          <div id="${avatar3.avatarId}" data-state="" class="z-10" data-answer="batsu" style="width: 50px; height: 50px;">
          </div>
        `
      const referee = new Referee(game2, draggable)
      const { winners } = useWinners()
      const { losers } = useLosers()
      const { addPlayer } = usePlayers()
      addPlayer(avatar)
      addPlayer(avatar2)
      addPlayer(avatar3)
      const correctAnswer = game2.quizzes[0].correct_answer

      referee.judge(correctAnswer)
      expect(winners.value).toHaveLength(1)
      expect(losers.value).toHaveLength(0)
      expect(mocks.endGame).not.toHaveBeenCalledOnce()
      expect(mocks.fireWorks).not.toHaveBeenCalledOnce()
    })

    it('if two answers correctly and one answer incorrectly, the game ends', () => {
      document.body.innerHTML = `
          <div id="${avatar.avatarId}" data-state="" class="z-10" data-answer="maru" style="width: 50px; height: 50px;">
          </div>

          <div id="${avatar2.avatarId}" data-state="" class="z-10" data-answer="maru" style="width: 50px; height: 50px;">
          </div>

          <div id="${avatar3.avatarId}" data-state="" class="z-10" data-answer="batsu" style="width: 50px; height: 50px;">
          </div>
        `
      const referee = new Referee(game2, draggable)
      const { winners } = useWinners()
      const { losers } = useLosers()
      const { addPlayer } = usePlayers()
      addPlayer(avatar)
      addPlayer(avatar2)
      addPlayer(avatar3)
      const correctAnswer = game2.quizzes[0].correct_answer

      referee.judge(correctAnswer)
      expect(winners.value).toHaveLength(2)
      expect(losers.value).toHaveLength(1)
      expect(mocks.endGame).toHaveBeenCalledOnce()
      expect(mocks.fireWorks).toHaveBeenCalledOnce()
    })

    it('if all answers incorrectly, the game continues', () => {
      document.body.innerHTML = `
          <div id="${avatar.avatarId}" data-state="" class="z-10" data-answer="batsu" style="width: 50px; height: 50px;">
          </div>

          <div id="${avatar2.avatarId}" data-state="" class="z-10" data-answer="batsu" style="width: 50px; height: 50px;">
          </div>

          <div id="${avatar3.avatarId}" data-state="" class="z-10" data-answer="batsu" style="width: 50px; height: 50px;">
          </div>
        `
      const referee = new Referee(game2, draggable)
      const { winners } = useWinners()
      const { losers } = useLosers()
      const { addPlayer } = usePlayers()
      addPlayer(avatar)
      addPlayer(avatar2)
      addPlayer(avatar3)
      const correctAnswer = game2.quizzes[0].correct_answer

      referee.judge(correctAnswer)
      expect(winners.value).toHaveLength(0)
      expect(losers.value).toHaveLength(0)
      expect(mocks.endGame).not.toHaveBeenCalledOnce()
      expect(mocks.fireWorks).not.toHaveBeenCalledOnce()
    })
  })
})
