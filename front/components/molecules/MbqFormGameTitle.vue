<script setup lang="ts">
  import { defineRule } from 'vee-validate'
  import { required } from '@vee-validate/rules'
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

  defineRule('required', required)
</script>

<template>
  <MbqItemContainer>
    <MbqLabel :id="props.id">名前</MbqLabel>
    <VeeField
      v-model="modelValue"
      name="title"
      type="text"
      :id="props.id"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      :rules="'required'"
    >
    </VeeField>
    <VeeErrorMessage name="title" class="text-red-700" />
  </MbqItemContainer>
</template>
