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
    class="text-black rounded-md bg-white px-4 p-4 border border-gray-200 text-md hover:brightness-[0.9] w-48"
    @click="handleClick"
    :type="buttonType"
  >
    <slot />
  </button>
</template>
