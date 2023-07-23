<script setup lang="ts">
  defineProps<{
    href: string
  }>()
</script>

<template>
  <NuxtLink :href="href">
    <img
      src="../../../assets/images/logo-trim.png"
      width="80"
      height="80"
      alt="logo"
    />
  </NuxtLink>
</template>
