<script setup lang="ts">
  defineProps<{
    labelFor: string
  }>()
</script>

<template>
  <label :for="labelFor" class="block text-md m-2">
    <slot />
  </label>
</template>
