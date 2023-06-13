<script setup lang="ts">
  const props = defineProps<{
    modelValue: string
    id: string
  }>()

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()

  const modelValue = computed({
    get: () => props.modelValue,
    set: (value) => emits('update:modelValue', value)
  })
</script>

<template>
  <MbqItemContainer>
    <MbqLabel :id="props.id">名前</MbqLabel>
    <VeeField
      name="title"
      :rules="'required'"
      type="text"
      v-model="modelValue"
      :id="props.id"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
    </VeeField>
    <VeeErrorMessage name="title" class="text-red-700" />
  </MbqItemContainer>
</template>
