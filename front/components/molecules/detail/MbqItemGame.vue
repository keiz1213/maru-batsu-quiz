<script setup lang="ts">
  const props = defineProps<{
    content: string | number
    labelName: string
    id: string
  }>()

  defineEmits<{
    (e: 'copy-to-clipboard'): void
  }>()

  const isVenueUrl = () => {
    return props.labelName === 'ゲーム会場URL'
  }
</script>

<template>
  <MbqItemContainer>
    <MbqLabel :labelFor="id">{{ labelName }}</MbqLabel>
    <MbqFrameLg :id="id">
      <MbqButtonClipboard
        v-if="isVenueUrl()"
        @click="$emit('copy-to-clipboard')"
        :button-type="'button'"
      />
      <p class="text-xl whitespace-pre-wrap">
        {{ content }}
      </p>
    </MbqFrameLg>
  </MbqItemContainer>
</template>
