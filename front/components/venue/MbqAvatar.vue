<script setup lang="ts">
  import Avatar from '~/utils/class/Avatar'

  defineProps<{
    avatar: Avatar
  }>()

  const { isMyAvatar } = useMyAvatar()
</script>

<template>
  <div
    :class="[
      'avatar',
      'flex-col',
      'animate__animated',
      'w-28',
      'break-all',
      { 'z-10': !isMyAvatar(avatar) },
      { 'z-50': isMyAvatar(avatar) }
    ]"
    data-answer=""
    data-state=""
    :id="avatar.avatarId"
  >
    <p :id="`avatar-name-${avatar.avatarId}`" class="text-center line-clamp-1">
      {{ avatar.avatarName }}
    </p>
    <div
      :class="[
        'w-16',
        'rounded-full',
        'ring',
        'ring-offset-base-100',
        'ring-offset-2',
        'm-5',
        'mt-1',
        { 'ring-primary': !isMyAvatar(avatar) },
        { 'ring-success': isMyAvatar(avatar) }
      ]"
    >
      <img
        :id="`avatar-img-${avatar.avatarId}`"
        :src="avatar.avatarImage"
        alt="avatar"
      />
    </div>
  </div>
</template>
