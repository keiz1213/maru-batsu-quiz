<template>
  <div class="mx-auto">
    <NuxtLink :to="`/games/new`">
      <div
        class="h-72 w-96 bg-gray-100 border border-gray-200 rounded-lg break-all flex justify-center"
      >
        <div class="h-32 my-auto">
          <div class="text-center">
            <h2 class="block mt-2 mb-2 text-2xl">新しいゲームを作成する</h2>
          </div>
          <div class="text-center">
            <MbqButtonCirculePlus
              :button-type="'button'"
            ></MbqButtonCirculePlus>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
