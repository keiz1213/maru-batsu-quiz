<script setup lang="ts">
  const props = defineProps<{
    numberOfWinner: number
  }>()

  const emits = defineEmits<{
    (e: 'update-number-of-winner', value: number): void
  }>()

  const numberOfWinner = computed({
    get: () => props.numberOfWinner,
    set: (value) => emits('update-number-of-winner', value)
  })

  const maxNumberOfWinner = 3

  const options = Array.from(
    { length: maxNumberOfWinner },
    (_, index) => index + 1
  )
</script>

<template>
  <div>
    <label for="form-number-of-winner" class="block text-md mb-2 ml-2"
      >勝者枠</label
    >
    <select
      data-cy="form-number-of-winner"
      id="form-number-of-winner"
      name="form-number-of-winner"
      v-model="numberOfWinner"
      class="bg-gray-50 border border-gray-300 text-md rounded-lg select select-bordered block w-full max-w-xs p-2.5"
    >
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>
