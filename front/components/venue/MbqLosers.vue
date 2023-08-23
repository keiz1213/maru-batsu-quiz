<script setup lang="ts">
  import Avatar from '~/utils/class/Avatar'

  defineProps<{
    losers: Avatar[]
  }>()
</script>

<template>
  <div
    class="w-[1320px] pt-2 pl-2 h-56 backdrop-blur-sm bg-white/30 rounded-lg break-all my-4"
  >
    <div>
      <MbqAvatar
        class="animate__bounce"
        v-for="loser in losers"
        :key="loser.avatarId"
        :avatar="loser"
      />
    </div>
  </div>
</template>
