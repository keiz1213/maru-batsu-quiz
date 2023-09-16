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
    <div
      :class="[
        'w-16',
        'rounded-full',
        'ring',
        'ring-offset-base-100',
        'ring-offset-2',
        'mx-auto',
        { 'ring-neutral-content': !isMyAvatar(avatar) },
        { 'ring-primary': isMyAvatar(avatar) }
      ]"
    >
      <img
        :class="['bg-white', { 'opacity-80': !isMyAvatar(avatar) }]"
        :id="`avatar-img-${avatar.avatarId}`"
        :src="avatar.avatarImage"
        alt="avatar"
      />
    </div>
    <p :id="`avatar-name-${avatar.avatarId}`" class="text-center line-clamp-1">
      {{ avatar.avatarName }}
    </p>
  </div>
</template>
