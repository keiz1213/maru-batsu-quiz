<script setup lang="ts">
  const emits = defineEmits<{
    (e: 'click'): void
  }>()

  const handleClick = () => {
    emits('click')
  }
</script>

<template>
  <button class="h-8 w-8 rounded-full bg-white shadow-md" @click="handleClick">
    ✕
  </button>
</template>
