<script setup lang="ts">
  defineProps<{
    content: string | number
    labelName: string
    id: string
  }>()
</script>

<template>
  <MbqItemContainer>
    <MbqLabel :id="id">{{ labelName }}</MbqLabel>
    <MbqFlameLg :id="id">
      <p class="text-xl whitespace-pre-wrap">
        {{ content }}
      </p>
    </MbqFlameLg>
  </MbqItemContainer>
</template>
