<script setup lang="ts">
  const emits = defineEmits<{
    (e: 'click'): void
  }>()

  const handleClick = () => {
    emits('click')
  }
</script>

<template>
  <MbqItemContainer>
    <button
      class="text-white rounded-md bg-green-400 px-4 p-4 text-sm shadow-md hover:opacity-70 w-48"
      @click="handleClick"
    >
      <slot />
    </button>
  </MbqItemContainer>
</template>
