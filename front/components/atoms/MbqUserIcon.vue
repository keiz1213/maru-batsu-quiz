<script setup lang="ts">
  defineProps<{
    modelValue: boolean
    src: string
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
    @click="handleClick"
    :class="{
      'after:content-[\'\'] after:w-full after:h-full after:cursor-default after:fixed after:top-0 after:left-0 after:z-0':
        modelValue
    }"
  >
    <img
      class="h-14 w-14 rounded-full border-4 border-double border-blue-500 object-cover object-center"
      :src="src"
    />
  </button>
</template>
