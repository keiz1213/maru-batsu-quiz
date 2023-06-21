<script setup lang="ts">
  import { Member } from '@/types/Member'

  defineProps<{
    member: Member
    gameStart?: Boolean
  }>()
</script>

<template>
  <div
    v-if="member.id != 0"
    class="avatar flex-col z-10"
    data-answer=""
    data-draggable=""
    :id="member.uid"
  >
    <p class="text-center line-clamp-1">{{ member.name }}</p>
    <div
      :class="[
        'w-16',
        'rounded-full',
        'ring',
        'ring-primary',
        'ring-offset-base-100',
        'ring-offset-2',
        'm-5',
        'mt-1',
        { 'z-10': gameStart }
      ]"
    >
      <img :src="member.avatar_url" />
    </div>
  </div>
  <div v-else class="avatar z-0">
    <div
      class="w-16 rounded-full ring-offset-base-100 ring-offset-2 m-5 cursor-default z-0"
    ></div>
  </div>
</template>
