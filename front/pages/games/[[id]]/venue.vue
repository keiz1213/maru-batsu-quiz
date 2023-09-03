<script setup lang="ts">
  definePageMeta({
    layout: false,
    middleware: ['auth', 'entry-check']
  })
</script>

<template>
  <VenueView />
</template>
