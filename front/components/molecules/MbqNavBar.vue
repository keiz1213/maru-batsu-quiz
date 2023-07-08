<script setup lang="ts">
  const props = defineProps<{
    avatarUrl: string
  }>()

  const emits = defineEmits<{
    (e: 'logout'): void
  }>()

  const { isLoggedIn } = useAuth()

  const isOpen = ref(false)
  const toggleIsopen = () => {
    isOpen.value = !isOpen.value
  }

  const logout = () => {
    emits('logout')
  }
</script>

<template>
  <div class="bg-white px-3 py-0 fixed w-full z-10 border-2">
    <header>
      <div class="flex items-center justify-between">
        <MbqBrand :href="'/home'"></MbqBrand>
        <MbqUserIcon
          v-if="isLoggedIn()"
          :src="props.avatarUrl"
          v-model:modelValue="isOpen"
          @click="toggleIsopen"
        ></MbqUserIcon>
      </div>
    </header>
  </div>
  <div
    v-if="isLoggedIn()"
    :class="isOpen ? 'block' : 'hidden'"
    class="bg-white w-48 fixed right-0 mt-16 z-10 rounded-lg overflow-hidden border"
  >
    <ul>
      <li class="block hover:bg-gray-200">
        <button @click="logout" class="block w-full py-3 text-left pl-3">
          ログアウト
        </button>
      </li>
      <li class="block hover:bg-gray-200">
        <NuxtLink
          :to="'/withdrawalConfirmation'"
          class="block w-full py-3 text-left pl-3"
        >
          退会
        </NuxtLink>
      </li>
    </ul>
  </div>
  <slot />
</template>
