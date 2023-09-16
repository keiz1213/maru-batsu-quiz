<script setup lang="ts">
  import { Game } from '~/types/game'
  import OwnerAvatar from '~/utils/class/OwnerAvatar'
  import ChatQuestionOutlineIcon from 'vue-material-design-icons/ChatQuestionOutline.vue'
  import FormatListChecksIcon from 'vue-material-design-icons/FormatListChecks.vue'

  defineProps<{
    owner: OwnerAvatar | undefined
    game: Game
    currentQuizNumber: number
  }>()

  const emit = defineEmits<{
    (e: 'announce'): void
    (e: 'check-question'): void
  }>()

  const { isOwner } = useCurrentUser()
  const { quizLoading } = useQuizLoading()
</script>

<template>
  <div class="w-[350px] h-[350px] bg-white rounded-lg flex flex-col mx-2">
    <MacBar :title="'Owner'" />
    <div v-if="owner" class="flex justify-center my-5">
      <Avatar :avatar="owner" />
    </div>
    <div class="w-[350px] h-full bg-white rounded-lg">
      <div v-if="isOwner(game)">
        <div
          class="flex flex-col justify-center items-center gap-4 bg-mac-finder-top min-h-[185px] rounded-lg m-3 mt-0"
        >
          <div>
            <PrimaryButton
              id="question-button"
              @click="emit('announce')"
              :is-loading="quizLoading"
              ><div class="flex">
                <chat-question-outline-icon />
                <span class="ml-1"
                  >{{ currentQuizNumber + 1 }} 問目を出題する</span
                >
              </div>
            </PrimaryButton>
          </div>
          <div>
            <SecondaryButton
              id="check-question-button"
              :button-type="'button'"
              @click="emit('check-question')"
              ><div class="flex">
                <format-list-checks-icon />
                <span class="ml-2">問題を確認する</span>
              </div>
            </SecondaryButton>
          </div>
        </div>
      </div>
      <div
        v-else
        class="overflow-auto h-[185px] bg-mac-finder-top p-3 m-3 mt-0 rounded-lg"
        id="check-game-description"
      >
        <p class="leading-loose break-words whitespace-pre-wrap">
          {{ game.description }}
        </p>
      </div>
    </div>
  </div>
</template>
