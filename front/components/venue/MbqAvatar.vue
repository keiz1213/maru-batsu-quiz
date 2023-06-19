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
    class="avatar relative ml-8 mt-4"
    data-answer=""
    data-draggable=""
    :id="member.uid"
  >
    <div
      :class="[
        'w-16',
        'rounded-full',
        'ring',
        'ring-primary',
        'ring-offset-base-100',
        'ring-offset-2',
        'm-3',
        { 'z-10': gameStart }
      ]"
    >
      <img :src="member.avatar_url" />
    </div>
    <p class="absolute -bottom-4 line-clamp-1">{{ member.name }}</p>
  </div>
  <div v-else class="avatar z-0 ml-8 mt-4">
    <div
      class="w-16 rounded-full ring-offset-base-100 ring-offset-2 m-3 cursor-default z-0"
    ></div>
  </div>
</template>
