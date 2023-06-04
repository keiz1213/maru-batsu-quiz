<script setup lang="ts">
  const emits = defineEmits<{
    (e: 'click'): void
  }>()

  const handleClick = () => {
    emits('click')
  }
</script>

<template>
  <button
    class="h-14 w-14 text-green-600 rounded-full bg-white shadow-md text-3xl"
    @click="handleClick"
  >
    +
  </button>
</template>
