<script setup lang="ts">
  definePageMeta({
    layout: 'mbq-after-login'
  })

  const { githubLogin, isLoading } = useAuth()

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
          オンラインイベントを盛り上げよう
        </h1>
        <div class="text-center">
          <MbqButtonGithub :onClick="githubLogin" :isLoading="isLoading" />
        </div>
      </div>
    </div>
    <div id="bottom" class="flex justify-between w-[1300px] mx-auto my-32">
      <div class="w-[400px] h-[420px] bg-slate-100 rounded-2xl">
        <h2 class="text-3xl text-center my-5">1. クイズを作る</h2>
        <p class="text-lg mx-7">
          ○✗クイズを作成したらゲーム会場のURLが発行されます
        </p>
        <img
          class="mx-auto pt-10"
          src="../assets/images/create.png"
          width="300px"
          height="300px"
          alt=""
        />
        <p class="text-center pt-3">
          Illustration by
          <a href="https://icons8.com/illustrations/author/lZpGtGw5182N"
            >Elisabet Guba</a
          >
          from <a href="https://icons8.com/illustrations">Ouch!</a>
        </p>
      </div>
      <div class="w-[400px] h-[420px] bg-slate-100 rounded-2xl">
        <h2 class="text-3xl text-center my-5">2. URLをシェア</h2>
        <p class="text-lg mx-7">発行されたURLを参加予定者にシェアしましょう</p>
        <img
          class="mx-auto"
          src="../assets/images/share.png"
          width="300px"
          height="300px"
          alt=""
        />
        <p class="text-center">
          Illustration by
          <a href="https://icons8.com/illustrations/author/lZpGtGw5182N"
            >Elisabet Guba</a
          >
          from <a href="https://icons8.com/illustrations">Ouch!</a>
        </p>
      </div>
      <div class="w-[400px] h-[420px] bg-slate-100 rounded-2xl">
        <h2 class="text-3xl text-center my-5">3. 遊ぶ</h2>
        <p class="text-lg mx-7">
          みんなで同じURLにアクセスして○✗クイズで遊びましょう！
        </p>
        <img
          class="mx-auto"
          src="../assets/images/winner.png"
          width="300px"
          height="300px"
          alt=""
        />
        <p class="text-center">
          Illustration by
          <a href="https://icons8.com/illustrations/author/VKgWUPlqQ7Ea"
            >AlexManokhi</a
          >
          from <a href="https://icons8.com/illustrations">Ouch!</a>
        </p>
      </div>
    </div>
  </div>
</template>
