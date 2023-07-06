<script setup lang="ts">
  import Avatar from '@/utils/Avatar'
  import { VueFinalModal } from 'vue-final-modal'

  defineProps<{
    players: Avatar[]
    isOwner: boolean
    publisherNames: string[]
    errorMessage: string
  }>()

  const emit = defineEmits<{
    (e: 'startConnection'): void
    (e: 'subscribeAllPlayers'): void
    (e: 'promptAllPlayersSubscribeOwner'): void
    (e: 'promptSubscribeAllPlayers'): void
    (e: 'sendMyAvatar'): void
    (e: 'sendAllPlayerAvatar'): void
    (e: 'promptStartGame'): void
  }>()
</script>
<template>
  <VueFinalModal
    class="flex justify-center"
    content-class="w-3/4 h-3/4 m-auto bg-white rounded-lg space-y-2 absolute inset-0"
  >
    <div class="absolute inset-0 overflow-auto">
      <div v-if="isOwner" class="my-5">
        <h1 class="text-center text-xl">
          参加予定者が全員入室中になったら「接続開始」を押してください
        </h1>
        <p class="text-red-500 text-center text-3xl">{{ errorMessage }}</p>
      </div>
      <div v-else class="my-8">
        <h1 class="text-center text-xl">
          接続確認中です。そのままお待ち下さい・・・
        </h1>
        <p class="text-red-500 text-center text-3xl">{{ errorMessage }}</p>
      </div>
      <slot />
      <div v-if="isOwner" class="my-5">
        <div class="my-5">
          <p class="text-center">{{ publisherNames.length }}人が入室中</p>
        </div>
        <div>
          <ul class="w-1/2 bg-mac-finder-top mx-auto p-5 rounded-lg">
            <li v-for="(name, index) in publisherNames" :key="index">
              {{ name }} が入室中・・・
            </li>
          </ul>
        </div>
      </div>
      <div
        class="w-1/2 min-h-[400px] m-auto my-10 rounded-lg border border-mac-finder-side"
      >
        <MbqMacBar :title="'Entry'" :isChat="false" />
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
      <div class="w-1/2 mx-auto mb-10 text-center">
        <MbqButtonSecondary
          v-if="isOwner"
          :button-type="'button'"
          @click="emit('startConnection')"
          >接続開始</MbqButtonSecondary
        >
      </div>
      <div class="w-1/2 mx-auto mb-10 text-center">
        <MbqButtonSecondary
          v-if="isOwner"
          :button-type="'button'"
          @click="emit('subscribeAllPlayers')"
          ><span class="text-black"
            >ownerがall playersをsubscribe&setHandlerする</span
          ></MbqButtonSecondary
        >
      </div>
      <div class="w-1/2 mx-auto mb-10 text-center">
        <MbqButtonSecondary
          v-if="isOwner"
          :button-type="'button'"
          @click="emit('promptAllPlayersSubscribeOwner')"
          ><span class="text-black"
            >all playersがownerをsubscribe&setHandlerする</span
          ></MbqButtonSecondary
        >
      </div>
      <div class="w-1/2 mx-auto mb-10 text-center">
        <MbqButtonSecondary
          v-if="isOwner"
          :button-type="'button'"
          @click="emit('promptSubscribeAllPlayers')"
          ><span class="text-black"
            >all playersがall playersをsubscribe&setHandlerする</span
          ></MbqButtonSecondary
        >
      </div>
      <div class="w-1/2 mx-auto mb-10 text-center">
        <MbqButtonSecondary
          v-if="isOwner"
          :button-type="'button'"
          @click="emit('sendMyAvatar')"
          ><span class="text-black"
            >ownerがall playerにsend Avatarする</span
          ></MbqButtonSecondary
        >
      </div>
      <div class="w-1/2 mx-auto mb-10 text-center">
        <MbqButtonSecondary
          v-if="isOwner"
          :button-type="'button'"
          @click="emit('sendAllPlayerAvatar')"
          ><span class="text-black"
            >ownerがall playerにsend All Avatarする</span
          ></MbqButtonSecondary
        >
      </div>
      <div class="w-1/2 mx-auto mb-10 text-center">
        <MbqButtonSecondary
          v-if="isOwner"
          :button-type="'button'"
          @click="emit('promptStartGame')"
          ><span class="text-black"
            >ownerがall playerにゲームを開始するように促す</span
          ></MbqButtonSecondary
        >
      </div>
    </div>
  </VueFinalModal>
</template>
