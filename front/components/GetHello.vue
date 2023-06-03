<script setup lang="ts">
  const messages = ref<string[]>([])
  const getHello = async () => {
    const { data } = await useMyFetch('/api/v1/hello')
    const msg = data.value as string
    messages.value.push(msg)
  }
</script>

<template>
  <div>
    <button @click="getHello">Get Hello</button>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">
        {{ msg }}
      </li>
    </ul>
  </div>
</template>
