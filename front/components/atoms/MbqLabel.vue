<script setup lang="ts">
  defineProps<{
    id: string
  }>()
</script>

<template>
  <label
    :for="id"
    class="block text-sm font-medium text-gray-900 dark:text-white"
  >
    <slot />
  </label>
</template>
