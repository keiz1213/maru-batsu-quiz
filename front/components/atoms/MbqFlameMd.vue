<script setup lang="ts">
  defineProps<{
    id: string
  }>()
</script>

<template>
  <div
    :id="id"
    class="w-full max-w-2xl p-4 bg-white border border-gray-300 rounded-lg"
  >
    <slot />
  </div>
</template>
