<script setup lang="ts">
  const props = defineProps<{
    description: string
  }>()

  const emits = defineEmits<{
    (e: 'update-description', value: string): void
  }>()

  const description = computed({
    get: () => props.description,
    set: (value) => emits('update-description', value)
  })
</script>

<template>
  <div>
    <label for="form-description" class="block text-md mb-2 ml-2"
      >ゲームの説明</label
    >
    <VeeField
      data-cy="form-description"
      name="description"
      id="form-description"
      :rules="'required'"
      as="textarea"
      placeholder="これから一緒に働く仲間と○✕クイズで親睦を深めましょう！最後まで残った1名に素敵なプレゼントがあります！"
      v-model="description"
      rows="4"
      class="p-2.5 w-full text-md bg-gray-50 rounded-lg border border-gray-300"
    ></VeeField>
    <VeeErrorMessage :name="'description'" class="text-red-700 block m-2" />
  </div>
</template>
