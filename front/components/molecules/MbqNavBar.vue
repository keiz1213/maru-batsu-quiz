<script setup lang="ts">
  defineProps<{
    avatarUrl: string
  }>()

  const emits = defineEmits<{
    (e: 'logout'): void
  }>()

  const { isLoggedIn } = useAuth()

  const logout = () => {
    emits('logout')
  }
</script>

<template>
  <div class="bg-white px-3 py-0 fixed w-full z-10 border-b">
    <header>
      <div class="flex items-center justify-between">
        <MbqBrand :href="isLoggedIn() ? '/home' : '/'"></MbqBrand>
        <div v-if="isLoggedIn()" class="dropdown dropdown-end dropdown-hover">
          <MbqUserIcon tabindex="0" :src="avatarUrl"></MbqUserIcon>
          <ul
            tabindex="0"
            class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button @click="logout" class="block w-full py-3 text-left pl-3">
                ログアウト
              </button>
            </li>
            <li>
              <NuxtLink
                :to="'/withdrawalConfirmation'"
                class="block w-full py-3 text-left pl-3"
              >
                退会
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  </div>
  <slot />
</template>
