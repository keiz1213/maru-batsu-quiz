<script setup lang="ts">
  import { User } from '~/types/user'

  defineProps<{
    currentUser: User
  }>()
</script>

<template>
  <img
    class="h-12 w-12 rounded-full border-2 border-primary object-cover object-center"
    :src="currentUser.avatar_url"
    alt="user-icon"
  />
</template>
