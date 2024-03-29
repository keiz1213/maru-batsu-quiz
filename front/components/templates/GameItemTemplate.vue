<script setup lang="ts">
  import { Game } from '~/types/game'
  import useClipboard from 'vue-clipboard3'
  import LoginVariantIcon from 'vue-material-design-icons/LoginVariant.vue'
  import PencilIcon from 'vue-material-design-icons/Pencil.vue'

  const props = defineProps<{
    game: Game
    gameVenueUrl: string
  }>()

  const emits = defineEmits<{
    (e: 'destroy-game'): void
  }>()

  const showConfirm = ref(false)
  const showSelect = ref(false)
  const cancel = () => (showConfirm.value = false)
  const confirm = () => (showConfirm.value = true)
  const select = () => (showSelect.value = true)
  const emitDestroyGame = () => emits('destroy-game')

  const goToVenue = () => {
    navigateTo(props.gameVenueUrl, { external: true })
  }

  const goToVenueWithChat = () => {
    localStorage.setItem('chat', 'enabled')
    navigateTo(props.gameVenueUrl, { external: true })
  }

  const copyVenueUrl = async () => {
    const { toClipboard } = useClipboard()
    await toClipboard(props.gameVenueUrl)
    const tip = document.getElementById('tooltip') as HTMLElement
    tip.classList.toggle('hidden')
    setTimeout(() => {
      tip.classList.toggle('hidden')
    }, 1000)
  }
</script>

<template>
  <ChatSelectModal
    v-model="showSelect"
    title="チャットは使いますか？"
    @chat-mode="goToVenueWithChat"
    @non-caht-mode="goToVenue"
  />
  <DestroyConfirmModal
    v-model="showConfirm"
    title="本当に削除してもいいですか？"
    @destroy-game="emitDestroyGame"
    @cancel="cancel"
  />
  <div>
    <TheH1>{{ game.title }}</TheH1>
  </div>
  <div class="my-6">
    <GameDescription :description="game.description" />
  </div>
  <div class="my-6">
    <QuizTable :quizzes="game.quizzes" />
  </div>
  <div class="my-6">
    <GameNumberOfWinner :number-of-winner="game.number_of_winner" />
  </div>
  <div class="my-6">
    <GameVenueUrl :venue-url="gameVenueUrl" @copy-to-clipboard="copyVenueUrl" />
  </div>
  <div>
    <div class="mt-16 md:flex md:justify-evenly">
      <div class="mt-2 hidden sm:block">
        <PrimaryButton @click="select"
          ><div class="flex justify-center">
            <login-variant-icon /><span class="ml-1">ゲーム会場へ入る</span>
          </div></PrimaryButton
        >
      </div>
      <div class="mt-2">
        <NuxtLink :to="`/games/${game.id}/edit`">
          <SecondaryButton :button-type="'button'"
            ><div class="flex justify-center">
              <pencil-icon /><span class="ml-2">編集する</span>
            </div></SecondaryButton
          >
        </NuxtLink>
      </div>
    </div>
    <div>
      <div class="flex justify-end">
        <span
          @click="confirm"
          class="underline hover:cursor-pointer text-slate-400 mt-3"
        >
          削除
        </span>
      </div>
    </div>
  </div>
</template>
