<script setup lang="ts">
  const navigate = () => {
    return navigateTo({
      path: '/games/new'
    })
  }
</script>

<template>
  <div class="mx-auto">
    <div
      class="h-72 w-96 bg-white border border-gray-200 rounded-lg break-all flex justify-center hover:brightness-[0.97] hover:cursor-pointer"
      @click="navigate"
    >
      <div class="h-32 my-auto">
        <div class="text-center">
          <h2 class="block mt-2 mb-2 text-2xl">新しいゲームを作成する</h2>
        </div>
        <div class="text-center text-green-400 text-6xl">
          <p>+</p>
        </div>
      </div>
    </div>
  </div>
</template>
