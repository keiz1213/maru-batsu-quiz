<script setup lang="ts">
  defineProps<{
    isLoading: boolean
  }>()

  const emits = defineEmits<{
    (e: 'login'): void
  }>()
</script>

<template>
  <div>
    <h1
      class="text-3xl font-bold my-3 text-gradient text-left leading-normal mt-24 mb-14 ml-7 md:text-5xl md:leading-normal"
    >
      仲間を誘って<br />
      オンラインで<br />
      ○×クイズを楽しもう
    </h1>
    <div class="text-center">
      <GithubButton @click="emits('login')" :is-loading="isLoading" />
    </div>
  </div>
</template>

<style scoped>
  .text-gradient {
    display: inline-block;
    background: -webkit-linear-gradient(19deg, #21d4fd 0%, #b721ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: blue;
  }
</style>
