<script setup lang="ts">
  import TrophyOutlineIcon from 'vue-material-design-icons/TrophyOutline.vue'
  import FolderPlusOutlineIcon from 'vue-material-design-icons/FolderPlusOutline.vue'
  import UpdateIcon from 'vue-material-design-icons/Update.vue'

  defineProps<{
    description: string
    numberOfWinner: number
    createdAt: string
    updatedAt: string
  }>()
</script>

<template>
  <div class="m-3 h-30 p-4 border rounded-lg">
    <p id="card-description" class="line-clamp-3">{{ description }}</p>
  </div>
  <div class="p-4 absolute bottom-0 right-0">
    <ul>
      <li>
        <div class="flex">
          <trophy-outline-icon />
          <span id="card-number-of-winner" class="ml-2"> 勝ち抜き人数: {{ numberOfWinner }}人 </span>
        </div>
      </li>
      <li>
        <div class="flex">
          <folder-plus-outline-icon /><span id="card-created-at" class="ml-1">作成日: {{ createdAt }}</span>
        </div>
      </li>
      <li>
        <div class="flex">
          <update-icon /><span id="card-updated-at" class="ml-1">更新日: {{ updatedAt }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
