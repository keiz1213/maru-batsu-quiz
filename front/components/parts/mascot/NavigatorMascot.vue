<script setup lang="ts">
  defineProps<{
    message: string
  }>()
</script>
<template>
  <div class="flex">
    <img
      class="h-20 w-20 rounded-full border-2 border-primary object-cover object-center block"
      src="../../../assets/images/mascot.png"
      alt="mascot"
    />
    <div class="chat chat-start">
      <div class="chat-bubble chat-bubble-primary">
        {{ message }}
      </div>
    </div>
  </div>
</template>
