<script setup lang="ts">
  defineProps<{
    src: string
  }>()
</script>

<template>
  <img
    class="h-14 w-14 rounded-full border-4 border-double border-blue-500 object-cover object-center"
    :src="src"
  />
</template>
