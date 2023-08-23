<script setup lang="ts">
  import Counter  from '~/utils/class/Counter'
  const { counter } = useCounter()
</script>

<template>
  {{ counter }}
  <button @click="Counter.inc()">inc</button>
</template>
