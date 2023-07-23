<script setup lang="ts">
  import Avatar from '~/utils/class/Avatar'

  defineProps<{
    avatar: Avatar
  }>()
</script>

<template>
  <div
    class="avatar flex-col z-10 animate__animated"
    data-answer=""
    data-state=""
    :id="avatar.id"
  >
    <p class="text-center line-clamp-1">{{ avatar.name }}</p>
    <div
      class="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 m-5 mt-1"
    >
      <img :src="avatar.avatarUrl" />
    </div>
  </div>
</template>
