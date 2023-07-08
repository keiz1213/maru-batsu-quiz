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
    class="text-black rounded-md bg-white px-4 p-4 border border-gray-300 text-md hover:brightness-[0.97] w-48"
    @click="handleClick"
    :type="buttonType"
  >
    <slot />
  </button>
</template>
