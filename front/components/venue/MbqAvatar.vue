<script setup lang="ts">
  import Avatar from '@/utils/Avatar'

  defineProps<{
    avatar: Avatar
    gameStart?: Boolean
  }>()
</script>

<template>
  <div
    v-if="avatar.id != 0"
    class="avatar flex-col z-10"
    data-answer=""
    data-draggable=""
    :id="avatar.uid"
  >
    <p class="text-center line-clamp-1">{{ avatar.name }}</p>
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
      <img :src="avatar.avatarUrl" />
    </div>
  </div>
  <div v-else class="avatar z-0">
    <div
      class="w-16 rounded-full ring-offset-base-100 ring-offset-2 m-5 cursor-default z-0"
    ></div>
  </div>
</template>
