<script setup lang="ts">
  defineProps<{
    buttonType?: 'submit' | 'reset' | 'button'
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
    class="h-8 w-8 rounded-full bg-white hover:brightness-[0.9]"
    @click="handleClick"
    :type="buttonType"
    data-cy="circle-cross-button"
  >
    ✕
  </button>
</template>
