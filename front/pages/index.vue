<script setup lang="ts">
  definePageMeta({
    layout: 'mbq-default',
    middleware: ['loggedin-redirect']
  })

  const { login, loading } = useAuth()
</script>

<template>
  <div class="max-w-full xl:mt-[70px]">
    <div class="max-w-full">
      <div id="top" class="xl:flex xl:justify-center max-w-[1400px] mx-auto">
        <div id="left" class="max-w-full text-center">
          <h1
            class="text-3xl font-bold my-3 text-gradient text-left leading-normal mt-24 mb-14 ml-7 xl:text-5xl xl:leading-normal md:text-5xl md:leading-normal"
          >
            仲間を誘って<br />
            オンラインで<br />
            ○×クイズを楽しもう
          </h1>
          <div class="text-center">
            <MbqButtonGithub :onClick="login" :isLoading="loading" />
          </div>
        </div>
        <div id="right" class="max-w-full my-10">
          <div>
            <div class="px-12 xl:px-24">
              <div
                class="sm:max-w-[640px] px-[20px] bg-black mx-auto mt-10 pt-5 rounded-t-lg relative"
              >
                <div
                  class="w-[8px] h-[8px] rounded-full bg-green-500 absolute top-1 left-[47%]"
                ></div>
                <img
                  src="../assets/images/demo1.png"
                  class="sm:max-w-[600px] block mx-auto"
                  alt="demo"
                />
              </div>
            </div>
            <div class="">
              <div
                class="sm:max-w-[800px] h-[25px] bg-slate-300 relative mx-auto"
              >
                <div
                  class="w-[120px] h-[8px] bg-slate-400 absolute rounded-b-lg left-[35%] md:left-[40%]"
                ></div>
              </div>
              <div
                class="sm:max-w-[800px] h-[8px] bg-slate-400 rounded-b-lg mx-auto"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-full bg-purple-100 mt-10 py-16">
      <div id="middle" class="max-w-[1400px] mx-auto">
        <div>
          <div>
            <h2 class="text-4xl pb-7 text-center">POINT</h2>
          </div>
          <div class="md:flex">
            <div class="max-w-full mx-3 mb-5 bg-white rounded-2xl p-7 md:w-1/3">
              <h3 class="text-3xl text-center mb-5">無料で遊べる</h3>
              <span
                >無料で遊べます。ただし、参加する人全てGitHubのアカウントが必要です。</span
              >
              <img
                class="block mx-auto mt-9"
                src="../assets/images/free.svg"
                width="180px"
                alt="free-icon"
              />
            </div>
            <div class="max-w-full mx-3 mb-5 bg-white rounded-2xl p-7 md:w-1/3">
              <h3 class="text-3xl text-center mb-5">リアルタイム</h3>
              <span
                >誰が、どれくらいの人数の人が、○ or ✗
                と答えているか、また回答に迷っている様子がリアルタイムで見れます。</span
              >
              <img
                class="block mx-auto mt-5"
                src="../assets/images/network.svg"
                width="180px"
                alt="network-icon"
              />
            </div>
            <div class="max-w-full mx-3 mb-5 bg-white rounded-2xl p-7 md:w-1/3">
              <h3 class="text-3xl text-center mb-5">操作が簡単</h3>
              <span
                >参加者全員がアバターとなって一つの会場に集合します。参加者は自分のアバターを動かして◯か✕か回答できます。</span
              >
              <img
                class="block mx-auto mt-5"
                src="../assets/images/beginner.svg"
                width="180px"
                alt="beginner-icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="bottom" class="max-w-full py-16 mb-10">
      <div class="max-w-[1400px] mx-auto">
        <div>
          <div>
            <h2 class="text-4xl pb-7 text-center">動作環境</h2>
          </div>
          <div class="md:flex">
            <div class="max-w-full mx-3 mb-5 bg-slate-100 rounded-2xl p-7 md:w-1/3">
              <h3 class="text-3xl text-center mb-5">PC</h3>
              <span
                >PCでのみご利用になれます。ただし、ゲームの作成、更新などのゲームプレイ以外はスマートフォンでも利用できます。
                </span
              >
              <img
                class="block mx-auto mt-3"
                src="../assets/images/pc.svg"
                width="180px"
                alt="free-icon"
              />
            </div>
            <div class="max-w-full mx-3 mb-5 bg-slate-100 rounded-2xl p-7 md:w-1/3">
              <h3 class="text-3xl text-center mb-5">ブラウザ</h3>
              <span
                >ブラウザでご利用になれます。推奨のブラウザはgoogle chromeとなっています。</span
              >
              <img
                class="block mx-auto mt-5"
                src="../assets/images/chrome.svg"
                width="180px"
                alt="network-icon"
              />
            </div>
            <div class="max-w-full mx-3 mb-5 bg-slate-100 rounded-2xl p-7 md:w-1/3">
              <h3 class="text-3xl text-center mb-5">同時接続人数</h3>
              <span
                >一度にゲームに参加できる人数は10人前後を推奨しています。</span
              >
              <img
                class="block mx-auto mt-5"
                src="../assets/images/team.svg"
                width="180px"
                alt="network-icon"
              />
            </div>
          </div>
        </div>
      </div>
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
