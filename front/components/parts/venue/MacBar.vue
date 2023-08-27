<script setup lang="ts">
  defineProps<{
    title: string
  }>()
</script>

<template>
  <div
    class="w-full h-7 bg-neutral-200 flex relative rounded-t-lg justify-center"
  >
    <MacButtons />
    <p>{{ title }}</p>
  </div>
</template>
