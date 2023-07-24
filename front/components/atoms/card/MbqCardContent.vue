<script setup lang="ts">
  import TrophyIcon from 'vue-material-design-icons/trophy.vue'
  import FolderIcon from 'vue-material-design-icons/folderPlus.vue'
  import UpdateIcon from 'vue-material-design-icons/update.vue'

  defineProps<{
    description: string
    numberOfWinner: number
    createdAt: string
    updatedAt: string
  }>()
</script>

<template>
  <div class="m-3 h-30 p-4 border rounded-lg">
    <p class="line-clamp-3">{{ description }}</p>
  </div>
  <div class="p-4 absolute bottom-0 right-0">
    <ul>
      <li>
        <div class="flex">
          <trophy-icon />
          <span class="ml-2"> 勝ち抜き人数: {{ numberOfWinner }}人 </span>
        </div>
      </li>
      <li>
        <div class="flex">
          <folder-icon /><span class="ml-1">作成日: {{ createdAt }}</span>
        </div>
      </li>
      <li>
        <div class="flex">
          <update-icon /><span class="ml-1">更新日: {{ updatedAt }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
