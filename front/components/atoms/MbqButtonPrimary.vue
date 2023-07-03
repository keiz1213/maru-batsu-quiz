<script setup lang="ts">
  defineProps<{
    buttonType?: 'submit' | 'reset'
    isLoading?: boolean
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
    :class="[
      'text-white',
      'rounded-md',
      'bg-green-600',
      'py-4',
      'px-4',
      'text-sm',
      'shadow-md',
      'hover:opacity-70',
      'w-48',
      { 'opacity-70': isLoading }
    ]"
    @click="handleClick"
    :type="buttonType"
    :disabled="isLoading"
  >
    <div
      v-if="isLoading"
      class="animate-spin h-5 w-5 border-4 border-blue-300 rounded-full border-t-transparent mx-auto"
    ></div>
    <slot v-else />
  </button>
</template>
