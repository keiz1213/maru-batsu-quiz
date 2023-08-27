<script setup lang="ts">
  defineProps<{
    title: string
    description: string
    fileName?: string
  }>()

  const generateImgPath = (fileName: string) => {
    return new URL(`../../assets/images/${fileName}.png`, import.meta.url).href
  }
</script>

<template>
  <div>
    <h3 class="text-xl my-4">{{ title }}</h3>
    <div class="bg-purple-100 rounded-2xl p-6">
      <div>
        <img
          class="block mx-auto"
          v-if="fileName"
          :src="generateImgPath(fileName!)"
          :alt="fileName"
        />
        <MbqMascotDiscription class="mt-10" :message="description" />
      </div>
    </div>
  </div>
</template>
