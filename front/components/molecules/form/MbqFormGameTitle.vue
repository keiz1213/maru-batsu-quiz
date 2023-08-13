<script setup lang="ts">
  const props = defineProps<{
    modelValue: string
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
    <MbqLabel :labelFor="'form-title'">名前</MbqLabel>
    <VeeField
      data-cy="form-title"
      id="form-title"
      name="title"
      :rules="'required'"
      type="text"
      v-model="modelValue"
      class="bg-gray-50 border border-gray-300 text-md rounded-lg focus:border-my-blue w-full p-2.5"
    >
    </VeeField>
    <VeeErrorMessage name="title" class="text-red-700 block m-2" />
  </MbqItemContainer>
</template>
