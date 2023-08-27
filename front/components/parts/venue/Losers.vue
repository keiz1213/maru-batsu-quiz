<script setup lang="ts">
  import PlayerAvatar from '~/utils/class/PlayerAvatar'

  defineProps<{
    losers: PlayerAvatar[]
  }>()
</script>

<template>
  <div
    class="w-[1320px] pt-2 pl-2 h-56 backdrop-blur-sm bg-white/30 rounded-lg break-all my-4"
  >
    <div>
      <Avatar
        class="animate__bounce"
        v-for="loser in losers"
        :key="loser.avatarId"
        :avatar="loser"
      />
    </div>
  </div>
</template>
