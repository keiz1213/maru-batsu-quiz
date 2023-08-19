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
      'bg-slate-400',
      'py-4',
      'px-4',
      'text-md',
      'hover:brightness-[0.9]',
      'w-48',
      { 'brightness-[0.9]': isLoading },
      { 'pointer-events-none': isLoading }
    ]"
    @click="handleClick()"
    :type="buttonType"
    data-cy="danger"
  >
    <div
      v-if="isLoading"
      id="loading"
      class="animate-spin h-5 w-5 border-4 border-gray-300 rounded-full border-t-transparent mx-auto px-2 py-2"
    ></div>
    <slot v-else />
  </button>
</template>
