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

  const copyVenueUrl = () => {
    copyToClipboard(gameVenueUrl)
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
</script>

<template>
  <TheContainer>
    <MbqH1>{{ game.title }}</MbqH1>
    <MbqItemGame
      :content="game.description"
      :labelName="'説明'"
      :id="'item-game-description'"
    />
    <MbqTableQuiz :quizzes="game.quizzes" />
    <MbqItemGame
      :content="game.number_of_winner"
      :labelName="'勝者枠'"
      :id="'item-game-number-of-winner'"
    />
    <MbqItemGame
      :content="gameVenueUrl"
      :labelName="'ゲーム会場URL'"
      :id="'item-game-venue-url'"
      @copy-to-clipboard="copyVenueUrl"
    />
    <div class="mt-16 md:flex md:justify-evenly">
      <div class="mt-2 hidden xl:block">
        <MbqButtonPrimary @click="select"
          ><div class="flex justify-center">
            <login-variant-icon /><span class="ml-1">ゲーム会場へ入る</span>
          </div></MbqButtonPrimary
        >
      </div>
      <div class="mt-2">
        <NuxtLink :to="`/games/${gameId}/edit`">
          <MbqButtonSecondary :buttonType="'button'"
            ><div class="flex justify-center">
              <pencil-icon /><span class="ml-2">編集する</span>
            </div></MbqButtonSecondary
          >
        </NuxtLink>
      </div>
    </div>
    <div class="flex justify-end">
      <p @click="confirm" class="underline hover:cursor-pointer text-slate-400">
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
  </TheContainer>
</template>
