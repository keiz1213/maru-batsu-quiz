<script setup lang="ts">
  const emits = defineEmits<{
    (e: 'click'): void
  }>()

  const handleClick = () => {
    emits('click')
  }
</script>

<template>
  <div>
    <span
      id="tooltip"
      class="whitespace-nowrap rounded bg-black px-2 py-1 text-white absolute -right-8 -top-9 before:content-[''] before:absolute before:-translate-x-1/2 before:left-1/2 before:top-full before:border-4 before:border-transparent before:border-t-black hidden"
      >Copied!</span
    >
    <button @click="handleClick" class="absolute top-0 right-0">
      <svg
        class="h-8 w-8 text-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
        />
      </svg>
    </button>
  </div>
</template>
