<script setup lang="ts">
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
        <p>勝ち抜き人数: {{ numberOfWinner }}人</p>
      </li>
      <li>
        <p>作成日: {{ createdAt }}</p>
      </li>
      <li>
        <p>更新日: {{ updatedAt }}</p>
      </li>
    </ul>
  </div>
</template>
