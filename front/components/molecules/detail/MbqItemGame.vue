<script setup lang="ts">
  const props = defineProps<{
    content: string | number
    labelName: string
    id: string
  }>()
  const { toClipboard } = useClipboard()

  const isVenueUrl = () => {
    return props.labelName === 'ゲーム会場URL'
  }

  const copy = async () => {
    const url = props.content as string
    const tip = document.getElementById('tooltip') as HTMLElement
    await toClipboard(url)
    tip.classList.toggle('hidden')
    setTimeout(() => {
      tip.classList.toggle('hidden')
    }, 1000)
  }
</script>

<template>
  <MbqItemContainer>
    <MbqLabel :labelFor="id">{{ labelName }}</MbqLabel>
    <MbqFrameLg :id="id">
      <MbqButtonClipboard
        v-if="isVenueUrl()"
        @click="copy"
        :button-type="'button'"
      />
      <p class="text-xl whitespace-pre-wrap">
        {{ content }}
      </p>
    </MbqFrameLg>
  </MbqItemContainer>
</template>
