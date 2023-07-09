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
    <MbqLabel :id="props.id">説明</MbqLabel>
    <VeeField
      :name="'description'"
      :rules="'required'"
      as="textarea"
      v-model="modelValue"
      :id="props.id"
      rows="4"
      class="p-2.5 w-full text-md bg-gray-50 rounded-lg border border-gray-300 focus:border-my-blue"
    ></VeeField>
    <VeeErrorMessage :name="'description'" class="text-red-700 block m-2" />
  </MbqItemContainer>
</template>
