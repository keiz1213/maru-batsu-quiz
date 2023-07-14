<script setup lang="ts">
  defineProps<{
    id: string
  }>()
</script>

<template>
  <label :for="id" class="block text-md m-2">
    <slot />
  </label>
</template>
