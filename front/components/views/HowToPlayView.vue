<script setup lang="ts">
  import ChatQuestionOutlineIcon from 'vue-material-design-icons/ChatQuestionOutline.vue'
  import ChatAlertOutlineIcon from 'vue-material-design-icons/ChatAlertOutline.vue'

  const asOwner = ref(true)
  const showAsOwner = () => (asOwner.value = true)
  const showAsPlayer = () => (asOwner.value = false)
</script>
<template>
  <div class="max-w-full xl:mt-[70px]">
    <div class="flex flex-col mt-[90px] max-w-[1200px] mx-auto px-1">
      <TheH1>HOW TO PLAY</TheH1>
      <div class="mt-10">
        <div class="flex">
          <div
            @click="showAsOwner"
            :class="[
              'w-52',
              'text-center',
              'p-2',
              'border-l',
              'border-t',
              'cursor-pointer',
              { 'opacity-40': !asOwner },
              { 'bg-gray-300': !asOwner }
            ]"
          >
            <div class="flex justify-center">
              <chat-question-outline-icon class="my-auto" />
              <span>出題者として</span>
            </div>
          </div>
          <div
            @click="showAsPlayer"
            :class="[
              'w-52',
              'text-center',
              'p-2',
              'border-r',
              'border-t',
              'cursor-pointer',
              { 'opacity-40': asOwner },
              { 'bg-gray-300': asOwner }
            ]"
          >
            <div class="flex justify-center">
              <chat-alert-outline-icon class="my-auto" />
              <span>回答者として</span>
            </div>
          </div>
          <div class="border-b w-full"></div>
        </div>
        <div>
          <div v-show="asOwner">
            <OwnerHowToPlayTemplate />
          </div>
          <div v-show="!asOwner">
            <PlayerHowToPlayTemplate />
          </div>
        </div>
      </div>
      <span class="mt-16 text-2xl underline hover:cursor-pointer w-20"
        ><NuxtLink :to="'/'">←Top</NuxtLink></span
      >
    </div>
  </div>
</template>
