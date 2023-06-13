<script setup lang="ts">
  defineProps<{
    buttonType: 'button' | 'submit' | 'reset'
  }>()
  const emits = defineEmits<{
    (e: 'click'): void
  }>()

  const handleClick = () => {
    emits('click')
  }
</script>

<template>
  <button
    class="h-8 w-8 rounded-full bg-gray-200 shadow-md"
    @click="handleClick"
    :type="buttonType"
  >
    ✕
  </button>
</template>
