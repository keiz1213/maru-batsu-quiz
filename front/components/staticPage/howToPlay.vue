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
  <div class="my-10">
    <h3 class="text-xl my-4">{{ title }}</h3>
    <div class="bg-slate-100 rounded-2xl p-6">
      <img v-if="fileName" :src="generateImgPath(fileName!)" :alt="fileName" />
      <p :class="['text-center', fileName ? 'mt-5' : '']">
        {{ description }}
      </p>
    </div>
  </div>
</template>
