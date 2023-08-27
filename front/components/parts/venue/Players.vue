<script setup lang="ts">
  import PlayerAvatar from '~/utils/class/PlayerAvatar'

  defineProps<{
    players: PlayerAvatar[]
  }>()
</script>

<template>
  <div
    class="w-[650px] h-[600px] rounded-lg flex mx-2 border border-mac-finder-side"
  >
    <div id="left">
      <div
        class="w-[140px] bg-mac-finder-side h-[598px] rounded-l-lg relative z-0"
      >
        <div class="h-[50px]">
          <MacButtons />
        </div>
      </div>
    </div>
    <div id="right">
      <div class="w-[508px] h-[50px] bg-mac-finder-top rounded-tr-lg">
        <div class="flex pl-5 pt-3">
          <div>
            <span>Players</span>
          </div>
        </div>
      </div>
      <div class="w-[508px] h-[548px] rounded-br-lg break-all bg-white">
        <div class="grid grid-cols-4 gap-x-3 p-6">
          <Avatar
            v-for="player in players"
            :key="player.avatarId"
            :avatar="player"
          />
        </div>
      </div>
    </div>
  </div>
</template>
