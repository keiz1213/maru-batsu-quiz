<script setup lang="ts">
  import { getGame } from '~/utils/getters'

  const props = defineProps<{
    gameId: string
  }>()

  const config = useRuntimeConfig()
  const frontUrl = config.public.frontURL
  const gameId = props.gameId
  const { setToast } = useToast()

  const removeGame = async (gameId: string): Promise<void> => {
    await useMyFetch(`/api/v1/games/${gameId}`, {
      method: 'delete'
    })
    setToast('ゲームを削除しました!', 'success')
    navigateTo('/home')
  }

  const game = await getGame(gameId)
  const gameVenueUrl = `${frontUrl}/games/${gameId}/venue?title=${game.title}`

  const showModal = ref(false)
  const confirm = () => {
    removeGame(gameId)
  }
  const cancel = () => {
    showModal.value = false
  }
</script>

<template>
  <TheContainer>
    <MbqH1>{{ game.title }}</MbqH1>
    <MbqItemGame
      :content="game.description"
      :labelName="'説明'"
      :id="'show-game-description'"
    />
    <MbqTableQuiz :quizzes="game.quizzes" />
    <MbqItemGame
      :content="game.number_of_winner"
      :labelName="'勝ち抜き人数'"
      :id="'show-game-number-of-winner'"
    />
    <MbqItemGame
      :content="gameVenueUrl"
      :labelName="'ゲーム会場URL'"
      :id="'show-game-venue-url'"
    />
    <div class="flex justify-evenly">
      <NuxtLink :to="gameVenueUrl">
        <MbqButtonPrimary :buttonType="'button'">会場へ</MbqButtonPrimary>
      </NuxtLink>
      <NuxtLink :to="`/games/${gameId}/edit`">
        <MbqButtonSecondary :buttonType="'button'">編集</MbqButtonSecondary>
      </NuxtLink>
    </div>
    <div class="flex justify-end">
      <p
        @click="showModal = true"
        class="underline hover:cursor-pointer text-red-600"
      >
        削除
      </p>
    </div>
    <MbqModalConfirm
      v-model="showModal"
      title="本当に削除してもいいですか？"
      @confirm="confirm"
      @cancel="cancel"
    />
  </TheContainer>
</template>
