<script setup lang="ts">
  import { Member } from '@/types/Member'

  defineProps<{
    memberObject: Member
    gameStart?: Boolean
  }>()
</script>

<template>
  <div
    v-if="memberObject.id != 0"
    class="avatar"
    data-answer=""
    data-draggable=""
    :id="memberObject.uid"
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
      <img :src="memberObject.avatar_url" />
    </div>
  </div>
  <div v-else class="avatar z-0">
    <div
      class="w-16 rounded-full ring-offset-base-100 ring-offset-2 m-3 cursor-default z-0"
    ></div>
  </div>
</template>
