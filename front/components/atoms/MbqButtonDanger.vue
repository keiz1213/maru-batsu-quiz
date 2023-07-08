<script setup lang="ts">
  defineProps<{
    buttonType?: 'submit' | 'reset' | 'button'
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
      'bg-red-600',
      'py-4',
      'px-4',
      'text-md',
      'hover:brightness-[0.9]',
      'w-48',
      { 'brightness-[0.9]': isLoading }
    ]"
    @click="handleClick()"
    :type="buttonType"
    :disabled="isLoading"
  >
    <div
      v-if="isLoading"
      class="animate-spin h-5 w-5 border-4 border-my-blue rounded-full border-t-transparent mx-auto"
    ></div>
    <slot v-else />
  </button>
</template>
