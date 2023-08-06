<script setup lang="ts">
  import { Game } from '~/types/game'
  import { deleteGame } from '~/utils/api/services/game'
  import LoginVariantIcon from 'vue-material-design-icons/LoginVariant.vue'
  import PencilIcon from 'vue-material-design-icons/Pencil.vue'

  const props = defineProps<{
    game: Game
  }>()

  const { setToast, notifyOnSpot } = useToast()
  const config = useRuntimeConfig()
  const gameId = props.game.id as number
  const frontUrl = config.public.frontURL
  const gameVenuePath = `/games/${gameId}/venue`
  const queryParams = new URLSearchParams({ title: props.game.title })
  const gameVenueUrl = `${frontUrl}${gameVenuePath}?${queryParams.toString()}`
  const showConfirm = ref(false)
  const showSelect = ref(false)
  const cancel = () => (showConfirm.value = false)
  const confirm = () => (showConfirm.value = true)
  const select = () => (showSelect.value = true)

  const goToVenue = () => {
    navigateTo(gameVenueUrl, { external: true })
  }
  const goToVenueWithChat = () => {
    localStorage.setItem('chat', 'enabled')
    navigateTo(gameVenueUrl, { external: true })
  }

  const destroyGame = async () => {
    try {
      await deleteGame(gameId)
      setToast('ゲームを削除しました!', 'success')
      navigateTo('/home')
    } catch {
      notifyOnSpot(
        'ゲームの削除に失敗しました。再度やり直してください。',
        'error'
      )
    }
  }

  useHead({
    title: props.game.title
  })
</script>

<template>
  <TheContainer>
    <div class="px-40">
      <MbqH1>{{ game.title }}</MbqH1>
      <MbqItemGame
        :content="game.description"
        :labelName="'説明'"
        :id="'item-game-description'"
      />
      <MbqTableQuiz :quizzes="game.quizzes" />
      <MbqItemGame
        :content="game.number_of_winner"
        :labelName="'勝ち抜き人数'"
        :id="'item-game-number-of-winner'"
      />
      <MbqItemGame
        :content="gameVenueUrl"
        :labelName="'ゲーム会場URL'"
        :id="'item-game-venue-url'"
      />
      <div class="flex justify-evenly mt-16">
        <MbqButtonPrimary @click="select"
          ><div class="flex">
            <login-variant-icon /><span class="ml-1">ゲーム会場へ入る</span>
          </div></MbqButtonPrimary
        >
        <NuxtLink :to="`/games/${gameId}/edit`">
          <MbqButtonSecondary :buttonType="'button'"
            ><div class="flex">
              <pencil-icon /><span class="ml-7">編集する</span>
            </div></MbqButtonSecondary
          >
        </NuxtLink>
      </div>
      <div class="flex justify-end">
        <p @click="confirm" class="underline hover:cursor-pointer text-red-600">
          削除
        </p>
      </div>
      <MbqModalSelect
        v-model="showSelect"
        title="チャットは使いますか？"
        @chat-mode="goToVenueWithChat"
        @non-caht-mode="goToVenue"
      />
      <MbqModalConfirm
        v-model="showConfirm"
        title="本当に削除してもいいですか？"
        @destroy-game="destroyGame"
        @cancel="cancel"
      />
    </div>
  </TheContainer>
</template>
