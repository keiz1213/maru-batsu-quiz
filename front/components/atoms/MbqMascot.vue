<script setup lang="ts">
  defineProps<{
    animateClass?: string
  }>()
</script>
<template>
  <div>
    <img
      :class="[
        'h-14',
        'w-14',
        'object-cover',
        'object-center',
        'block',
        'animate__animated',
        'animate__infinite',
        animateClass
      ]"
      src="../../assets/images/mascot.png"
    />
  </div>
</template>
