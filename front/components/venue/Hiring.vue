<script setup>
  defineProps({
    members: Array
  })
</script>

<template>
  <div
    id="description"
    class="w-full max-w p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 break-all"
  >
    <p class="text-2xl">challenger</p>
    <div v-for="(member, index) in members" :key="index" class="avatar flex">
      <div
        v-if="member.id != ''"
        class="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 m-3"
      >
        <img :src="member.avatar_url" />
      </div>
      {{ member.name }}
    </div>
  </div>
</template>
