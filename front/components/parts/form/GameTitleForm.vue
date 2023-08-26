<script setup lang="ts">
  const props = defineProps<{
    title: string
  }>()

  const emits = defineEmits<{
    (e: 'update-title', value: string): void
  }>()

  const title = computed({
    get: () => props.title,
    set: (value) => emits('update-title', value)
  })
</script>

<template>
  <div>
    <label for="form-title" class="block text-md mb-2 ml-2">ゲーム名</label>
    <VeeField
      data-cy="form-title"
      id="form-title"
      name="title"
      :rules="'required'"
      type="text"
      placeholder="新入社員歓迎ミートアップ"
      v-model="title"
      class="bg-gray-50 border border-gray-300 text-md rounded-lg w-full p-2.5"
    >
    </VeeField>
    <VeeErrorMessage name="title" class="text-red-700 block m-2" />
  </div>
</template>
