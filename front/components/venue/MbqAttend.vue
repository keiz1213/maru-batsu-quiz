<script setup lang="ts">
  defineProps<{
    members: object
  }>()
</script>

<template>
  <div
    id="description"
    class="w-full max-w p-4 bg-white border border-gray-200 rounded-lg break-all"
  >
    <div>
      <MbqAvatar
        v-for="(member, index) in members"
        :key="index"
        :member="member"
      />
    </div>
  </div>
</template>
