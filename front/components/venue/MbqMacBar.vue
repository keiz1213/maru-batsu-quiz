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
  <div
    class="w-full h-7 bg-neutral-200 flex relative rounded-t-lg justify-center"
  >
    <MbqMacButtons />
    <p>{{ title }}</p>
    <div v-if="isChat" class="absolute right-0.5 top-0.5">
      <input
        @change="emit('update:chatVisible')"
        type="checkbox"
        class="toggle toggle-primary"
        checked
      />
    </div>
  </div>
</template>
