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
    <button
      class="text-white rounded-md bg-green-400 px-4 p-4 text-sm shadow-md hover:opacity-70 w-48"
      @click="getHello"
    >
      Get Hello
    </button>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">
        {{ msg }}
      </li>
    </ul>
  </div>
</template>
