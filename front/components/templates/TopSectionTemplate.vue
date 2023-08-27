<script setup lang="ts">
  const { login } = useAuth()
  const { loading } = useLoading()
</script>

<template>
  <div class="xl:flex xl:justify-center mx-auto">
    <div class="max-w-full text-center">
      <CatchCopy :isLoading="loading" @login="login" />
    </div>
    <div class="max-w-full my-16">
      <MacBook />
    </div>
  </div>
</template>
