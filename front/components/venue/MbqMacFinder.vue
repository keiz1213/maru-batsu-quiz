<script setup lang="ts">
  defineProps<{
    members: object
    gameStart: boolean
    title: string
  }>()
</script>

<template>
  <div class="w-[660px] h-[600px] rounded-lg flex border border-gray-200">
    <div id="left">
      <div class="w-[150px] bg-mac-finder-side h-[600px] rounded-l-lg relative">
        <div class="h-[50px]">
          <MbqMacButtons />
        </div>
      </div>
    </div>
    <div id="right">
      <div class="w-[508px] h-[50px] bg-mac-finder-top rounded-tr-lg">
        <div class="flex pl-5 pt-3">
          <div>
            <p>{{ title }}</p>
          </div>
        </div>
        <div></div>
      </div>
      <div class="w-[508px] h-[600px] rounded-br-lg break-all">
        <div>
          <MbqAvatar
            v-for="(member, index) in members"
            :key="index"
            :member="member"
            :gameStart="gameStart"
          />
        </div>
      </div>
    </div>
  </div>
</template>
