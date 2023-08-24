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
    <MbqLabel :labelFor="'form-description'">ゲームの説明</MbqLabel>
    <VeeField
      data-cy="form-description"
      name="description"
      id="form-description"
      :rules="'required'"
      as="textarea"
      placeholder="これから一緒に働く仲間と○✕クイズで親睦を深めましょう！最後まで残った1名に素敵なプレゼントがあります！"
      v-model="modelValue"
      rows="4"
      class="p-2.5 w-full text-md bg-gray-50 rounded-lg border border-gray-300"
    ></VeeField>
    <VeeErrorMessage :name="'description'" class="text-red-700 block m-2" />
  </MbqItemContainer>
</template>
