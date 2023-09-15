<template>
  <div id="answerer">
    <!-- <div>
      <h2 class="text-2xl">
        <div class="flex">
          <chat-alert-outline-icon :size="31" />
          <span class="ml-3">回答者として</span>
        </div>
      </h2>
    </div> -->
    <div class="my-12">
      <HowToPlay
        :title="'1. シェアされたURLにアクセスする'"
        :description="'出題者からシェアされたURLにアクセスします。'"
        :fileName="'access-url'"
      ></HowToPlay>
    </div>
    <div class="my-12">
      <HowToPlay
        :title="'2. 接続が完了するまで待機'"
        :description="'アクセスできたら、ゲームが開始されるまで待機します。'"
        :fileName="'demo-wait-connecting'"
      ></HowToPlay>
    </div>
    <div class="my-12">
      <HowToPlay
        :title="'3. アバターを動かして回答する'"
        :description="'全ての参加者が接続を完了したらゲームが開始できるようになります。出題者からクイズが出題されたらアバターを動かして回答しましょう!'"
        :fileName="'demo1'"
      ></HowToPlay>
    </div>
  </div>
</template>
