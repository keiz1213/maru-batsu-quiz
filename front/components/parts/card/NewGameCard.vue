<template>
  <div>
    <NuxtLink :to="'/games/new'">
      <div
        class="h-72 w-80 bg-white border border-gray-200 rounded-lg break-all flex justify-center hover:brightness-[0.97] hover:cursor-pointer"
      >
        <div class="h-32 my-auto">
          <div class="text-center">
            <h2 class="block mt-2 mb-2 text-2xl">新しいゲームを作成する</h2>
          </div>
          <div class="text-center text-green-400 text-6xl">
            <span>+</span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
