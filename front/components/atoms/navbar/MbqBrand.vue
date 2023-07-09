<script setup lang="ts">
  defineProps<{
    href: string
  }>()
</script>

<template>
  <NuxtLink class="ml-2" :href="href">
    <img
      src="../../../assets/images/logo-trim.png"
      width="80"
      height="80"
      alt="logo"
    />
  </NuxtLink>
</template>
