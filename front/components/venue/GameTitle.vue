<script setup>
  defineProps({
    title: String
  })
</script>

<template>
  <div class="flex justify-center my-6 break-all">
    <h1 class="text-5xl">{{ title }}</h1>
  </div>
</template>
