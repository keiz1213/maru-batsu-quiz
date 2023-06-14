<script setup lang="ts">
  defineProps<{
    id: string
  }>()
</script>

<template>
  <div
    :id="id"
    class="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8 break-all relative"
  >
    <slot />
  </div>
</template>
