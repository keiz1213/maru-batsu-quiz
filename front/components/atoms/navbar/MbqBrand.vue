<script setup lang="ts">
  defineProps<{
    href: string
  }>()
</script>

<template>
  <NuxtLink :href="href">
    <img
      src="../../../assets/images/logo.png"
      width="150"
      height="100"
      alt="logo"
    />
  </NuxtLink>
</template>
