<script setup lang="ts">
  import { Quiz } from '@/types/Quiz'
  import { Member } from '@/types/Member'

  defineProps<{
    owner: Member
    quizzes: Quiz[]
    currentQuizNumber: number
    isOwner: boolean
    description: string
  }>()

  const emit = defineEmits<{
    (e: 'question'): void
    (e: 'check-question'): void
  }>()
</script>

<template>
  <div
    class="w-[420px] h-[270px] bg-white border border-gray-200 rounded-lg flex"
  >
    <MbqOwnerMenu
      v-if="isOwner"
      :quizzes="quizzes"
      :currentQuizNumber="currentQuizNumber"
      @question="emit('question')"
      @check-question="emit('check-question')"
    />
    <div
      v-else
      class="w-[270px] h-full bg-white border border-gray-200 rounded-lg overflow-auto"
    >
      <MbqMacBar :title="'Explanation'" :isChat="false" />
      <div class="p-2">
        {{ description }}
      </div>
    </div>
    <div class="w-[180px] border border-gray-200 rounded-lg">
      <MbqMacBar :title="'Owner'" :isChat="false" />
      <div class="flex justify-center my-12">
        <div v-if="owner">
          <MbqAvatar :member="owner" />
          <p class="text-center mb-2">{{ owner.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
