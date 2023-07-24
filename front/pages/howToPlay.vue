<script setup lang="ts">
  definePageMeta({
    layout: 'mbq-after-login'
  })

  useHead({
    title: '遊び方'
  })

  const router = useRouter()
</script>

<template>
  <TheContainer>
    <div class="flex flex-col gap-10 px-40">
      <div>
        <MbqH1>遊び方</MbqH1>
      </div>
      <div class="w-[400px] bg-slate-100 rounded-2xl p-6">
        <ul>
          <li class="py-1">
            <a class="hover:text-gray-500" href="#questioner">出題者として</a>
          </li>
          <li class="py-1">
            <a class="hover:text-gray-500" href="#answerer">回答者として</a>
          </li>
        </ul>
      </div>
      <div id="questioner" class="pt-20">
        <div>
          <h2 class="text-2xl">出題者として</h2>
        </div>
        <HowToPlay
          :title="'1. ゲームを作成する'"
          :description="'「新しいゲームを作成する」からゲームを作成します。クイズ数は必要に応じて増減できます。'"
          :fileName="'demo-create-new-game'"
        ></HowToPlay>
        <HowToPlay
          :title="'2. URLにアクセスする'"
          :description="'ゲームの作成が完了したら会場のURLが発行されるのでそのURLを後でシェアするためにコピーしておきます。コピーしたら作成者が「会場へ」を押して最初にアクセスしておきます。'"
          :fileName="'demo-go-to-venue'"
        ></HowToPlay>
        <HowToPlay
          :title="'3. URLをシェア'"
          :description="'作成者が最初にアクセスしたら、そのURLをコピーして参加予定者にシェアします。'"
        ></HowToPlay>
        <HowToPlay
          :title="'4. 参加者のアクセスを待つ'"
          :description="'作成者からは誰が会場にアクセスしてきたか確認できるようになっているので、参加予定者が全員アクセスするまで待ちます。'"
        ></HowToPlay>
        <HowToPlay
          :title="'5. 参加者が揃ったら接続開始'"
          :description="'参加予定者が全員アクセスしたのを確認して「接続開始」を押します。'"
          :fileName="'demo-connecting'"
        ></HowToPlay>
        <HowToPlay
          :title="'6. クイズを出題する'"
          :description="'全員の接続が完了するとゲームが開始できるようになるので、準備ができたら出題ボタンを押してクイズを出題しましょう。出題ボタンを押すと出題、回答、正解発表、判定、解説までが自動で行われます。解説まで終わったら次の問題が出題できるようになります。'"
          :fileName="'demo-how-to-question'"
        ></HowToPlay>
      </div>
      <div id="answerer" class="pt-20">
        <div>
          <h2 class="text-2xl">回答者として</h2>
        </div>
        <HowToPlay
          :title="'1. シェアされたURLにアクセスする'"
          :description="'出題者からシェアされたURLにアクセスします。'"
        ></HowToPlay>
        <HowToPlay
          :title="'2. 接続が完了するまで待機'"
          :description="'アクセスできたら、全参加者が接続するまで待機します。'"
          :fileName="'demo-wait-connecting'"
        ></HowToPlay>
        <HowToPlay
          :title="'3. アバターを動かして回答する'"
          :description="'全ての参加者が接続を完了したらゲームが開始できるようになります。出題者からクイズが出題されたらアバターを動かして回答しましょう!'"
          :fileName="'demo1'"
        ></HowToPlay>
      </div>
      <span
        @click="router.back"
        class="mt-16 text-2xl underline hover:cursor-pointer w-20"
        >←戻る</span
      >
    </div>
  </TheContainer>
</template>
