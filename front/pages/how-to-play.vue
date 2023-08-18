<script setup lang="ts">
  import ChatQuestionOutlineIcon from 'vue-material-design-icons/ChatQuestionOutline.vue'
  import ChatAlertOutlineIcon from 'vue-material-design-icons/ChatAlertOutline.vue'
  definePageMeta({
    layout: 'mbq-default'
  })

  useHead({
    title: '遊び方',
    meta: [
      {
        name: 'description',
        content: 'ゲームの遊び方'
      },
      {
        name: 'og:title',
        content: '遊び方'
      },
      {
        name: 'og:description',
        content: 'ゲームの遊び方'
      }
    ]
  })

  const router = useRouter()
</script>

<template>
  <div>
    <div class="w-[180px] h-full bg-slate-200 fixed top-[70px] z-10">
      <div>
        <ul>
          <li>
            <a class="block" href="#questioner">
              <div class="flex p-4 hover:bg-slate-300 hover:cursor-pointer">
                <chat-question-outline-icon />
                <span class="ml-3">出題者として</span>
              </div>
            </a>
          </li>
          <li>
            <a class="block" href="#answerer">
              <div class="flex p-4 hover:bg-slate-300 hover:cursor-pointer">
                <chat-alert-outline-icon />
                <span class="ml-3">回答者として</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex flex-col px-48 mt-[90px] ml-[80px]">
      <div>
        <MbqH1>遊び方</MbqH1>
      </div>
      <div id="questioner">
        <div class="mt-10">
          <h2 class="text-2xl">
            <div class="flex">
              <chat-question-outline-icon :size="31" />
              <span class="ml-3">出題者として</span>
            </div>
          </h2>
        </div>
        <div class="my-12">
          <HowToPlay
            :title="'1. ゲームを作成する'"
            :description="'ホームの「新しいゲームを作成する」からゲームを作成します。'"
            :fileName="'demo-create-new-game'"
          ></HowToPlay>
        </div>
        <div class="my-12">
          <HowToPlay
            :title="'2. 会場URLをコピーする'"
            :description="'ゲームの作成が完了したら、そのゲームの会場URLが発行されるのでそれをコピーします。'"
            :fileName="'demo-copy-url'"
          ></HowToPlay>
        </div>
        <div class="my-12">
          <HowToPlay
            :title="'3. ゲーム会場にアクセス'"
            :description="'ゲームの作者が一番最初にゲーム会場にアクセスしてください。アクセス方法は、ゲーム詳細ページの「ゲーム会場へ入る」をクリックしてください。作者が会場に入っていないと、他の参加者が会場に入れないので注意してください。'"
            :fileName="'demo-go-to-venue'"
          ></HowToPlay>
        </div>
        <div class="my-12">
          <HowToPlay
            :title="'4. 会場URLを参加者にシェア'"
            :description="'ゲーム作者が会場に入った状態で、先程コピーしたURLを参加者にシェアします。'"
            :fileName="'share-url'"
          ></HowToPlay>
          <div class="flex justify-end">
            <span>
              Illustration by
              <a href="https://icons8.com/illustrations/author/259416"
                >Marina Green</a
              >
              from <a href="https://icons8.com/illustrations">Ouch!</a>
            </span>
          </div>
        </div>
        <div class="my-12">
          <HowToPlay
            :title="'5. 参加者がゲーム会場にアクセスするのを待つ'"
            :description="'参加者全員がシェアしたURLにアクセスするのを待ちます。アクセスした人は「入室済み」となります。'"
            :fileName="'demo-wait'"
          ></HowToPlay>
        </div>
        <div class="my-12">
          <HowToPlay
            :title="'6. 参加者全員が会場に入ったことを確認する'"
            :description="'ゲーム作成者には、どの参加者がゲーム会場にアクセスしてきたかわかるようになっています。全参加者が入室したことを確認できたら、「ゲームを開始する」をクリックします。クリックすると接続が始まるので接続が終わるまで待ちます。'"
            :fileName="'demo-start'"
          ></HowToPlay>
        </div>
        <div class="my-12">
          <HowToPlay
            :title="'7. ゲームを開始'"
            :description="'接続が完了するとクイズが出題できるようになります。画面右上にゲーム作者用のメニューがあるのでそこから出題します。「n問目を出題する」というボタンを一度クリックすると、出題、回答、判定、解説まで自動で行われます。解説まで終わると次のクイズを出題できるようになります。'"
            :fileName="'demo-play'"
          ></HowToPlay>
        </div>
      </div>
      <div id="answerer" class="pt-20">
        <div>
          <h2 class="text-2xl">
            <div class="flex">
              <chat-alert-outline-icon :size="31" />
              <span class="ml-3">回答者として</span>
            </div>
          </h2>
        </div>
        <div class="my-12">
          <HowToPlay
            :title="'1. シェアされたURLにアクセスする'"
            :description="'出題者からシェアされたURLにアクセスします。'"
            :fileName="'access-url'"
          ></HowToPlay>
          <div class="flex justify-end">
            <span>
              Illustration by
              <a href="https://icons8.com/illustrations/author/iAdLsFJOKDrk"
                >Tanya Krasutska</a
              >
              from <a href="https://icons8.com/illustrations">Ouch!</a>
            </span>
          </div>
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
      <span
        @click="router.back"
        class="mt-16 text-2xl underline hover:cursor-pointer w-20"
        >←戻る</span
      >
    </div>
  </div>
</template>
