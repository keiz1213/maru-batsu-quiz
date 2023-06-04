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
    class="text-white rounded-md bg-rose-500 py-4 px-4 text-sm shadow-md hover:opacity-70"
    @click="handleClick()"
  >
    <slot />
  </button>
</template>
