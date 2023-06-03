<script setup lang="ts">
  const name = ref<string>('world')
</script>

<template>
  <div>
    <input v-model="name" type="text" />
    <Helloworld :name="name" />
    <GetHello />
  </div>
</template>
