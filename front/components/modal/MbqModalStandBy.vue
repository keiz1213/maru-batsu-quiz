<script setup lang="ts">
  import Avatar from '~/utils/class/Avatar'
  import { VueFinalModal } from 'vue-final-modal'
  import CheckIcon from 'vue-material-design-icons/CheckBold.vue'
  import ConnectIcon from 'vue-material-design-icons/humanGreetingProximity.vue'
  import InfoIcon from 'vue-material-design-icons/informationOutline.vue'

  defineProps<{
    players: Avatar[]
    isOwner: boolean
    publisherNames: string[]
  }>()

  const emit = defineEmits<{
    (e: 'start-connection'): void
  }>()

  const { loading, setLoading } = useLoading()

  const handleClick = () => {
    emit('start-connection')
    setLoading()
  }
</script>
<template>
  <VueFinalModal
    class="flex justify-center"
    content-class="w-3/4 h-3/4 m-auto bg-white rounded-lg space-y-2 absolute inset-0"
  >
    <div class="absolute inset-0 overflow-auto">
      <div v-if="isOwner" class="my-5 mx-auto w-2/3">
        <h2 class="text-center text-xl my-2">
          <div class="flex">
            <info-icon :size="28" />
            <span class="ml-2">
              この会場のURLを参加予定者にシェアしてください
            </span>
          </div>
        </h2>
        <h2 class="text-center text-xl my-2">
          <div class="flex">
            <info-icon :size="28" />
            <span class="ml-2">
              参加予定者がURLにアクセスすると、その人は「入室済み」となります
            </span>
          </div>
        </h2>
        <h2 class="text-center text-xl">
          <div class="flex">
            <info-icon :size="28" />
            <span class="ml-2">
              参加予定者が全員入室済みになったら「接続開始する」を押してください
            </span>
          </div>
        </h2>
      </div>
      <div v-else class="my-8">
        <h1 class="text-center text-xl">
          接続確認中です。そのままお待ち下さい・・・
        </h1>
      </div>
      <div class="w-2/3 mx-auto my-5 p-5 bg-slate-100 rounded-2xl">
        <ul>
          <li>
            <div class="flex m-2">
              <check-icon />
              <span class="mx-2"
                >接続を開始すると後から入室することはできません</span
              >
            </div>
          </li>
          <li>
            <div class="flex m-2">
              <check-icon />
              <span class="mx-2"
                >接続が完了するとゲームを始めることができます</span
              >
            </div>
          </li>
          <li>
            <div class="flex m-2">
              <check-icon />
              <span class="mx-2">
                ブラウザバックや、タブを閉じる、リロードするなどするとエラーになります
              </span>
            </div>
          </li>
          <li>
            <div class="flex m-2">
              <check-icon />
              <span class="mx-2">
                途中でエラーが発生した場合は全員退室後、再度入室してください
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="isOwner" class="my-5">
        <div class="my-5">
          <p class="text-center">{{ publisherNames.length }}人が入室済み</p>
        </div>
        <div>
          <ul class="w-2/3 bg-mac-finder-top mx-auto p-5 rounded-lg">
            <li v-for="(name, index) in publisherNames" :key="index">
              {{ name }} が入室済み
            </li>
          </ul>
        </div>
        <div class="w-2/3 mx-auto my-10 text-center">
          <MbqButtonPrimary
            :button-type="'button'"
            :isLoading="loading"
            @click="handleClick"
            ><div class="flex">
              <connect-icon />
              <span class="ml-2"> 接続を開始する </span>
            </div></MbqButtonPrimary
          >
        </div>
      </div>
      <div
        class="w-2/3 min-h-[400px] m-auto my-10 rounded-lg border border-mac-finder-side"
      >
        <MbqMacBar :title="'Entry'" />
        <div class="flex justify-center" aria-label="読み込み中">
          <div
            class="animate-spin h-10 w-10 border-4 border-blue-300 rounded-full border-t-transparent mt-3"
          ></div>
        </div>
        <div class="grid grid-cols-4 gap-x-3 p-6">
          <MbqAvatar
            class="animate__bounce"
            v-for="player in players"
            :key="player.id"
            :avatar="player"
          />
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>
