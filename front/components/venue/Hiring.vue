<script setup lang="ts">
  defineProps<{
    members: object
  }>()
</script>

<template>
  <div
    id="description"
    class="w-full max-w p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8 break-all"
  >
    <div>
      <Avatar
        v-for="(member, index) in members"
        :key="index"
        :memberObject="member"
      />
    </div>
  </div>
</template>
