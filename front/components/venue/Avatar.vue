<script setup>
  defineProps({
    memberObject: Object,
    gameStart: Boolean
  })
</script>

<template>
  <div class="avatar" :id="memberObject.uid">
    <div
      v-if="memberObject.id != ''"
      :class="[
        'w-16',
        'rounded-full',
        'ring',
        'ring-primary',
        'ring-offset-base-100',
        'ring-offset-2',
        'm-3',
        { 'z-10': gameStart }
      ]"
    >
      <img :src="memberObject.avatar_url" />
    </div>
    <div
      v-else
      class="w-16 rounded-full ring-offset-base-100 ring-offset-2 m-3 cursor-default z-0"
    ></div>
  </div>
</template>
