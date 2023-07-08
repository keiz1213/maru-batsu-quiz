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
    class="h-8 w-8 rounded-full bg-white border border-gray-200 hover:brightness-[0.9]"
    @click="handleClick"
    :type="buttonType"
  >
    ✕
  </button>
</template>
