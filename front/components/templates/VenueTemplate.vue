<script setup lang="ts">
  import { Game } from '~/types/game'
  import OwnerAvatar from '~/utils/class/OwnerAvatar'
  import PlayerAvatar from '~/utils/class/PlayerAvatar'

  defineProps<{
    avatar: OwnerAvatar | PlayerAvatar
    game: Game
  }>()

  const { participantMetaData } = useParticipantMetaData()
  const { owner } = useOwner()
  const { players } = usePlayers()
  const { losers } = useLosers()
  const { winners } = useWinners()
  const { numberOfWinner } = useNumberOfWinner()
  const { currentQuizNumber } = useCurrentQuizNumber()
  const { questionVisible } = useQuestionVisible()
  const { chatVisible, chatMessages } = useChat()
  const { standByGame, endOfGame } = useGameState()
  const { announceText } = useAnnounce()
  const { timeElapsed, timeLimit } = useTimer()
</script>

<template>
  <EndOfGameModal
    v-model="endOfGame"
    :winners="winners"
    :quizzes="avatar.createExercisedQuizzes(game.quizzes)"
    :background="'interactive'"
  />
  <StandByGameModal
    v-model="standByGame"
    :game="game"
    :participant-meta-data="participantMetaData"
    :players="players"
    :background="'interactive'"
    @start-connection="
      avatar instanceof OwnerAvatar ? avatar.startConnection(players) : null
    "
  />
  <QuizCheckModal
    v-model="questionVisible"
    :quizzes="game.quizzes"
    @close-question="
      avatar instanceof OwnerAvatar
        ? avatar.venueActivity!.closeQuestion()
        : null
    "
  />
  <div>
    <div
      id="main-container"
      class="bg-gradient-to-r from-violet-500 to-fuchsia-500 min-w-full w-[1350px]"
    >
      <MacHeader :title="game.title" :number-of-winner="numberOfWinner" />
      <div id="top-container" class="flex justify-center my-12">
        <div id="board-container">
          <div id="board-area">
            <QuizBoard
              :announce-text="announceText"
              :elapsed="timeElapsed"
              :limit="timeLimit"
            />
          </div>
        </div>
        <div id="owner-container">
          <div id="owner-area">
            <OwnerArea
              :owner="(owner as OwnerAvatar)"
              :game="game"
              :current-quiz-number="currentQuizNumber"
              @announce="
                avatar instanceof OwnerAvatar
                  ? avatar.announce(
                      currentQuizNumber,
                      game.quizzes[currentQuizNumber]
                    )
                  : null
              "
              @check-question="
                avatar instanceof OwnerAvatar
                  ? avatar.venueActivity!.openQuestion()
                  : null
              "
            />
          </div>
        </div>
      </div>
      <div id="public-container" class="flex justify-center mb-12">
        <div id="answer-container">
          <div id="answer-area">
            <Answer />
          </div>
        </div>
        <div v-if="chatVisible" id="chat-container">
          <div id="chat-area">
            <Chat
              :my-avatar-id="avatar.avatarId"
              :chat-messages="chatMessages"
              @send-message="avatar.sendChatMessage"
            />
          </div>
        </div>
      </div>
      <div id="player-container">
        <div id="players-winners-container" class="flex justify-center">
          <div id="players-area">
            <Players :players="players" />
          </div>
          <div id="winners-area">
            <Winners :winners="winners" />
          </div>
        </div>
        <div id="losers-container">
          <div id="losers-area" class="flex justify-center">
            <Losers :losers="losers" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
