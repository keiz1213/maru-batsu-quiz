<script setup lang="ts">
  import Avatar from '~/utils/class/Avatar'

  defineProps<{
    avatar: Avatar
  }>()
</script>

<template>
  <div
    class="avatar flex-col z-10 animate__animated w-28 break-all"
    data-answer=""
    data-state=""
    :id="avatar.id"
  >
    <p :id="`avatar-name-${avatar.id}`" class="text-center line-clamp-1">
      {{ avatar.name }}
    </p>
    <div
      class="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 m-5 mt-1"
    >
      <img :id="`avatar-img-${avatar.id}`" :src="avatar.avatarUrl" />
    </div>
  </div>
</template>
