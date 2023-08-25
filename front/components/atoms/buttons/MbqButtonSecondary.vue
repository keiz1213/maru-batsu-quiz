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
      'bg-green-400',
      'py-3',
      'px-4',
      'text-md',
      'hover:brightness-[0.9]',
      'w-full',
      'h-16',
      'md:w-48',
      { 'brightness-[0.9]': isLoading },
      { 'pointer-events-none': isLoading }
    ]"
    @click="handleClick"
    :type="buttonType"
  >
    <span
      v-if="isLoading"
      id="loading"
      class="loading loading-spinner loading-lg"
    ></span>
    <slot v-else />
  </button>
</template>
