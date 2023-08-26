<script setup lang="ts">
  defineProps<{
    venueUrl: string
  }>()

  defineEmits<{
    (e: 'copy-to-clipboard'): void
  }>()
</script>

<template>
  <div>
    <label for="item-game-venue-url" class="block text-md mb-2 ml-2"
      >会場URL</label
    >
    <div
      class="w-full p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8 break-all relative"
    >
      <MbqButtonClipboard
        @click="$emit('copy-to-clipboard')"
        :button-type="'button'"
      />
      <span id="item-game-venue-url" class="text-xl whitespace-pre-wrap">
        {{ venueUrl }}
      </span>
    </div>
  </div>
</template>
