<script setup lang="ts">
  import { Game } from '~/types/game'
  import { ParticipantMetaData } from '~/types/participantMetaData'
  import PlayerAvatar from '~/utils/class/PlayerAvatar'
  import { VueFinalModal } from 'vue-final-modal'
  import CheckBoldIcon from 'vue-material-design-icons/CheckBold.vue'
  import HumanGreetingProximityIcon from 'vue-material-design-icons/HumanGreetingProximity.vue'
  import InformationOutlineIcon from 'vue-material-design-icons/InformationOutline.vue'

  defineProps<{
    game: Game
    players: PlayerAvatar[]
    participantMetaData: ParticipantMetaData[]
  }>()

  const emit = defineEmits<{
    (e: 'start-connection'): void
  }>()

  const handleClick = () => {
    emit('start-connection')
  }

  const { isOwner } = useCurrentUser()
  const { connectionLoading } = useConnectionLoading()
  const { connectionProgress } = useConnectionProgress()
</script>
<template>
  <VueFinalModal
    class="flex justify-center"
    content-class="h-3/4 m-auto bg-white rounded-lg space-y-2 absolute inset-0 w-[850px]"
  >
    <div class="absolute inset-0 overflow-auto">
      <div class="flex justify-between mx-5 mt-5">
        <Mascot :animateClass="'animate__bounce'" />
        <Mascot :animateClass="'animate__rubberBand'" />
      </div>
      <div v-if="isOwner(game)" class="my-5 mx-auto w-2/3">
        <h2 class="text-xl my-2">
          <div class="flex">
            <information-outline-icon :size="28" />
            <span class="ml-2">
              この会場のURLを参加予定者にシェアしてください
            </span>
          </div>
        </h2>
        <h2 class="text-xl my-2">
          <div class="flex">
            <information-outline-icon :size="28" />
            <span class="ml-2">
              参加予定者がURLにアクセスすると、その人は「入室済み」となります
            </span>
          </div>
        </h2>
        <h2 class="text-xl">
          <div class="flex">
            <information-outline-icon :size="28" />
            <span class="ml-2">
              全員入室済みになったら「ゲームを開始する」を押してください
            </span>
          </div>
        </h2>
      </div>
      <div v-else class="my-8">
        <h1 class="text-center text-xl">
          接続確認中です。そのままお待ち下さい・・・
        </h1>
        <div class="text-center">
          <span
            id="loading"
            class="loading loading-bars loading-lg mt-4 text-primary"
          ></span>
        </div>
      </div>
      <div class="w-2/3 mx-auto my-5 p-5 bg-slate-100 rounded-2xl">
        <ul>
          <li>
            <div class="flex m-2">
              <check-bold-icon />
              <span class="mx-2"
                >接続を開始すると後から入室することはできません</span
              >
            </div>
          </li>
          <li>
            <div class="flex m-2">
              <check-bold-icon />
              <span class="mx-2"
                >接続が完了するとゲームを始めることができます</span
              >
            </div>
          </li>
          <li>
            <div class="flex m-2">
              <check-bold-icon />
              <span class="mx-2">
                ブラウザバックや、タブを閉じる、リロードするなどするとエラーになります
              </span>
            </div>
          </li>
          <li>
            <div class="flex m-2">
              <check-bold-icon />
              <span class="mx-2">
                途中でエラーが発生した場合は全員退室後、再度入室してください
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="isOwner(game)" class="my-5">
        <div class="my-5">
          <p class="text-center">
            {{ participantMetaData.length }}人が入室済み
          </p>
        </div>
        <div>
          <ul class="w-2/3 bg-mac-finder-top mx-auto p-5 rounded-lg">
            <li v-for="(data, index) in participantMetaData" :key="index">
              <div class="flex my-3">
                <img
                  class="h-12 w-12 rounded-full border-2 border-primary object-cover object-center block"
                  :src="data.imageUrl"
                  alt="user-icon"
                /><span class="mt-3 ml-2">{{ data.name }} が入室済み</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="w-2/3 mx-auto my-5 text-center">
          <PrimaryButton
            :button-type="'button'"
            :is-loading="connectionLoading"
            @click="handleClick"
            ><div class="flex">
              <human-greeting-proximity-icon />
              <span class="ml-2"> ゲームを開始する </span>
            </div></PrimaryButton
          >
          <progress
            class="block mx-auto mt-5 progress progress-info w-56"
            max="100"
            :value="connectionProgress"
            id="progress"
          ></progress>
        </div>
      </div>
      <div
        class="w-2/3 min-h-[400px] m-auto my-10 rounded-lg border border-mac-finder-side"
      >
        <div class="grid grid-cols-4 gap-x-3 p-6">
          <Avatar
            class="animate__bounce"
            v-for="player in players"
            :key="player.avatarId"
            :avatar="player"
          />
        </div>
      </div>
      <div class="flex justify-between mx-5 my-10">
        <Mascot :animateClass="'animate__tada'" />
        <Mascot :animateClass="'animate__heartBeat'" />
      </div>
    </div>
  </VueFinalModal>
</template>
