<script setup lang="ts">
  defineProps<{
    href: string
  }>()
</script>

<template>
  <NuxtLink class="font-bold text-2xl text-white" :href="href">
    <slot />
  </NuxtLink>
</template>
