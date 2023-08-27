<script setup lang="ts">
  definePageMeta({
    layout: false,
    middleware: ['auth', 'venue-status']
  })
</script>

<template>
  <VenueView />
</template>
