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
        <ul class="mt-24 mb-14">
          <li><span class="text-5xl font-bold text-center my-3 text-gradient">仲間と</span></li>
          <li><span class="text-5xl font-bold text-center my-3 text-gradient">オンラインで</span></li>
          <li><span class="text-5xl font-bold text-center my-3 text-gradient">○×クイズを楽しもう</span></li>
        </ul>
        <div class="text-center">
          <MbqButtonGithub :onClick="login" :isLoading="loading" />
        </div>
      </div>
    </div>
    <div id="middle" class="w-[1300px] h-[500px] mx-auto">
      <div>
        <div>
          <h3 class="text-3xl py-7 text-center">特徴</h3>
        </div>
        <div class="flex">
          <div class="w-1/3 h-[400px] mx-3 bg-slate-200 rounded-2xl p-7">
            <h4 class="text-3xl text-center mb-5">無料で遊べる</h4>
            <span>無料で遊べます。ただし、参加する人全てGitHubのアカウントが必要です。</span>
            <img class="block mx-auto mt-9" src="../assets/images/free.svg" width="200px" alt="">
          </div>
          <div class="w-1/3 h-[400px] mx-3 bg-slate-200 rounded-2xl p-7">
            <h4 class="text-3xl text-center mb-5">リアルタイム通信</h4>
            <span>誰が、どれくらいの人数の人が、○ or ✗ と答えているか、また回答に迷っている様子がリアルタイムで見れます。</span>
            <img class="block mx-auto mt-5" src="../assets/images/network.svg" width="200px" alt="">
          </div>
          <div class="w-1/3 h-[400px] mx-3 bg-slate-200 rounded-2xl p-7">
            <h4 class="text-3xl text-center mb-5">操作が簡単</h4>
            <span>参加者全員がアバターとなって一つの会場に集合します。参加者は自分のアバターを動かして◯か✕か回答できます。</span>
            <img class="block mx-auto mt-5" src="../assets/images/beginner.svg" width="200px" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-gradient {
  display: inline-block;
  background: -webkit-linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: blue;
}
</style>
