<script setup lang="ts">
  defineProps<{
    title: string
    isChat: boolean
  }>()

  const emit = defineEmits<{
    (e: 'update:chatVisible'): void
  }>()
</script>

<template>
  <div class="w-full h-7 bg-neutral-200 flex relative rounded-t-lg">
    <div class="flex absolute top-2 left-2">
      <div class="w-[13px] h-[13px] mr-1 rounded-full bg-rose-500"></div>
      <div class="w-[13px] h-[13px] mr-1 rounded-full bg-yellow-400"></div>
      <div class="w-[13px] h-[13px] rounded-full bg-green-500"></div>
    </div>
    <p class="mx-auto my-auto">{{ title }}</p>
    <div v-if="isChat" class="flex justify-end">
      <input
        @change="emit('update:chatVisible')"
        type="checkbox"
        class="toggle toggle-primary"
        checked
      />
    </div>
  </div>
</template>
