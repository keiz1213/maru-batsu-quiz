<script setup lang="ts">
  const props = defineProps<{
    modelValue: number | string
  }>()

  const emits = defineEmits<{
    (e: 'update:modelValue', value: number): void
  }>()

  const modelValue = computed({
    get: () => props.modelValue,
    set: (value) => {
      const selectedValue = value as string
      const numberOfWinner = parseInt(selectedValue)
      emits('update:modelValue', numberOfWinner)
    }
  })

  const maxNumberOfWinner = 3

  const options = Array.from(
    { length: maxNumberOfWinner },
    (_, index) => index + 1
  )
</script>

<template>
  <MbqItemContainer>
    <MbqLabel :labelFor="'form-number-of-winner'">勝ち抜き人数</MbqLabel>
    <select
      data-cy="form-number-of-winner"
      id="form-number-of-winner"
      name="form-number-of-winner"
      v-model="modelValue"
      class="bg-gray-50 border border-gray-300 text-md rounded-lg select select-bordered block w-full max-w-xs p-2.5"
    >
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
  </MbqItemContainer>
</template>
