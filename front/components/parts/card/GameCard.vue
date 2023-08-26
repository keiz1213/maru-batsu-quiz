<script setup lang="ts">
  import { Game } from '~/types/game'
  import TrophyOutlineIcon from 'vue-material-design-icons/TrophyOutline.vue'
  import FolderPlusOutlineIcon from 'vue-material-design-icons/FolderPlusOutline.vue'
  import UpdateIcon from 'vue-material-design-icons/Update.vue'

  defineProps<{
    game: Game
  }>()

  const format = (date: string) => {
    const dateTimeFormat = new Intl.DateTimeFormat('ja', {
      dateStyle: 'medium'
    })
    return dateTimeFormat.format(new Date(date))
  }
</script>

<template>
  <div>
    <NuxtLink :to="`/games/${game.id}`">
      <div
        id="card-container"
        class="h-72 w-80 bg-white border border-gray-200 rounded-lg break-all relative hover:brightness-[0.97] hover:cursor-pointer"
      >
        <div
          class="p-2 bg-primary border-x-1 border-t-1 border-gray-200 rounded-t-lg break-all text-white"
        >
          <h2
            id="card-title"
            class="mt-2 mb-2 text-center text-2xl line-clamp-1"
          >
            {{ game.title }}
          </h2>
        </div>
        <div class="m-3 h-30 p-4 border rounded-lg">
          <span id="card-description" class="line-clamp-3">{{
            game.description
          }}</span>
        </div>
        <div class="p-4 absolute bottom-0 right-0">
          <ul>
            <li>
              <div class="flex">
                <trophy-outline-icon />
                <span id="card-number-of-winner" class="ml-1">
                  勝者枠: {{ game.number_of_winner }}人
                </span>
              </div>
            </li>
            <li>
              <div class="flex">
                <folder-plus-outline-icon /><span
                  id="card-created-at"
                  class="ml-1"
                  >作成日: {{ format(game.created_at) }}</span
                >
              </div>
            </li>
            <li>
              <div class="flex">
                <update-icon /><span id="card-updated-at" class="ml-1"
                  >更新日: {{ format(game.updated_at) }}</span
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
