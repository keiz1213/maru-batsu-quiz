<script setup lang="ts">
  const props = defineProps<{
    modelValue: number
    id: string
  }>()

  const emits = defineEmits<{
    (e: 'update:modelValue', value: number): void
  }>()

  const modelValue = computed({
    get: () => props.modelValue,
    set: (value) => emits('update:modelValue', value)
  })

  const options = Array.from({ length: 10 }, (_, index) => index + 1)
</script>

<template>
  <MbqItemContainer>
    <MbqLabel :id="props.id">勝ち抜き人数</MbqLabel>
    <select
      v-model="modelValue"
      :id="props.id"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg select select-bordered block w-full max-w-xs p-2.5"
    >
      <option v-for="(option, index) in options" :key="index">
        {{ option }}
      </option>
    </select>
  </MbqItemContainer>
</template>
