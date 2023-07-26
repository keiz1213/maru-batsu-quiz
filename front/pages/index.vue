<script setup lang="ts">
  definePageMeta({
    layout: 'mbq-after-login',
    middleware: ['logged-in-redirect']
  })

  const { login, loading } = useAuth()
</script>

<template>
  <div class="min-w-full w-[1300px] mt-10">
    <div id="top" class="flex w-[1300px] mx-auto pt-10">
      <div id="left" class="w-[800px] h-[500px]">
        <div
          class="w-[620px] h-[360px] bg-black mx-auto mt-10 pt-5 rounded-t-lg relative"
        >
          <div
            class="w-[8px] h-[8px] rounded-full bg-green-500 absolute top-1 left-[300px]"
          ></div>
          <div class="w-[580px] h-[360px] mx-auto">
            <img src="../assets/images/demo1.png" alt="" />
          </div>
        </div>
        <div class="w-[800px] h-[25px] bg-slate-300 relative">
          <div
            class="w-[120px] h-[8px] bg-slate-400 absolute rounded-b-lg left-[340px]"
          ></div>
        </div>
        <div class="w-[800px] h-[8px] bg-slate-400 rounded-b-lg"></div>
      </div>
      <div id="right" class="w-[500px] h-[500px]">
        <h1 class="text-3xl font-bold text-center my-24">
          ○×クイズでオンラインイベントを盛り上げよう
        </h1>
        <div class="text-center">
          <MbqButtonGithub :onClick="login" :isLoading="loading" />
        </div>
      </div>
    </div>
  </div>
</template>
