<script setup lang="ts">
  import ClipboardOutlineIcon from 'vue-material-design-icons/ClipboardOutline.vue'

  const emits = defineEmits<{
    (e: 'click'): void
  }>()

  const handleClick = () => {
    emits('click')
  }
</script>

<template>
  <div>
    <div
      id="tooltip"
      class="tooltip tooltip-open tooltip-top hidden absolute -top-1 right-3"
      data-tip="Copied!"
    ></div>
    <button @click="handleClick" class="absolute top-1 right-1">
      <clipboard-outline-icon />
    </button>
  </div>
</template>
