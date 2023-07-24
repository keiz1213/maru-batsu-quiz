<script setup lang="ts">
  import GameIcon from 'vue-material-design-icons/NintendoGameBoy.vue'
  import LogoutIcon from 'vue-material-design-icons/logout.vue'
  import HandWaveIcon from 'vue-material-design-icons/handWaveOutline.vue'

  const emits = defineEmits<{
    (e: 'logout'): void
  }>()

  const { isLoggedIn } = useAuth()

  const logout = () => {
    emits('logout')
  }
</script>

<template>
  <div class="bg-white px-3 py-0 fixed w-full z-10 border-b h-[80px]">
    <header>
      <div class="flex items-center justify-between">
        <div class="pt-2">
          <MbqBrand :href="isLoggedIn ? '/home' : '/'"></MbqBrand>
        </div>
        <div class="flex h-[69px]">
          <div class="my-2 mr-3">
            <NuxtLink v-if="!isLoggedIn" :to="'/howToPlay'">
              <MbqButtonPrimary
                ><div class="flex">
                  <game-icon /><span class="ml-3">遊び方を見る</span>
                </div></MbqButtonPrimary
              >
            </NuxtLink>
          </div>
          <div
            v-if="isLoggedIn"
            class="dropdown dropdown-end dropdown-hover my-3"
          >
            <MbqUserIcon tabindex="0"></MbqUserIcon>
            <ul
              tabindex="0"
              class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NuxtLink
                  :to="'/howToPlay'"
                  class="block w-full py-3 text-left pl-3"
                >
                  <div class="flex">
                    <game-icon /><span class="ml-3">遊び方を見る</span>
                  </div>
                </NuxtLink>
              </li>
              <li>
                <button
                  @click="logout"
                  class="block w-full py-3 text-left pl-3"
                >
                  <div class="flex">
                    <logout-icon /><span class="ml-3">ログアウト</span>
                  </div>
                </button>
              </li>
              <li>
                <NuxtLink
                  :to="'/withdrawalConfirmation'"
                  class="block w-full py-3 text-left pl-3"
                >
                  <div class="flex">
                    <hand-wave-icon /><span class="ml-3">退会</span>
                  </div>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  </div>
  <slot />
</template>
