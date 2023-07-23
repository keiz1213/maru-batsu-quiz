<script setup lang="ts">
  import { Quiz } from '~/types/quiz'
  import Avatar from '~/utils/class/Avatar'

  defineProps<{
    owner: Avatar | undefined
    quizzes: Quiz[]
    currentQuizNumber: number
    isOwner: boolean
    description: string
  }>()

  const emit = defineEmits<{
    (e: 'announce'): void
    (e: 'check-question'): void
  }>()
</script>

<template>
  <div class="w-[350px] h-[350px] bg-white rounded-lg flex flex-col mx-2">
    <MbqMacBar :title="'Owner'" :isChat="false" />
    <div v-if="owner" class="flex justify-center mt-2">
      <MbqAvatar :avatar="owner" />
    </div>
    <div class="w-[350px] h-full bg-white rounded-lg">
      <div v-if="isOwner">
        <div
          class="flex flex-col justify-center items-center gap-4 bg-mac-finder-top min-h-[185px] rounded-lg m-3 mt-0"
        >
          <div>
            <MbqButtonPrimary @click="emit('announce')"
              >{{ currentQuizNumber + 1 }} 問目を出題する</MbqButtonPrimary
            >
          </div>
          <div>
            <MbqButtonSecondary
              :button-type="'button'"
              @click="emit('check-question')"
              >問題を確認する
            </MbqButtonSecondary>
          </div>
        </div>
      </div>
      <div
        v-else
        class="overflow-auto h-[185px] bg-mac-finder-top p-3 m-3 mt-0 rounded-lg"
      >
        <p class="leading-loose break-words whitespace-pre-wrap">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>
