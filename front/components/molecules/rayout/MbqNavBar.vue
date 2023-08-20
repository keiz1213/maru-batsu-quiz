<script setup lang="ts">
  import NintendoGameBoyIcon from 'vue-material-design-icons/NintendoGameBoy.vue'
  import LogoutIcon from 'vue-material-design-icons/Logout.vue'
  import HandWaveOutlineIcon from 'vue-material-design-icons/HandWaveOutline.vue'
  import ChatQuestionOutlineIcon from 'vue-material-design-icons/ChatQuestionOutline.vue'
  import ChatAlertOutlineIcon from 'vue-material-design-icons/ChatAlertOutline.vue'

  const emits = defineEmits<{
    (e: 'logout'): void
  }>()

  const { isLoggedIn } = useAuth()
  const route = useRoute()

  const logout = () => {
    emits('logout')
  }
</script>

<template>
  <header class="bg-white px-3 fixed w-full z-10 border-b h-[70px]">
    <div class="flex items-center justify-between">
      <div>
        <MbqBrand :href="isLoggedIn ? '/home' : '/'"></MbqBrand>
      </div>
      <div class="flex h-[69px]">
        <div v-if="!isLoggedIn" class="">
          <nav v-if="route.path === '/how-to-play'">
            <ul class="flex gap-1">
              <li>
                <a class="block" href="#questioner">
                  <div
                    class="flex h-[69px] hover:bg-slate-100 hover:cursor-pointer"
                  >
                    <chat-question-outline-icon class="my-auto" />
                    <span class="my-auto">出題者</span>
                  </div>
                </a>
              </li>
              <li>
                <a class="block" href="#answerer">
                  <div
                    class="flex h-[69px] hover:bg-slate-100 hover:cursor-pointer"
                  >
                    <chat-alert-outline-icon class="my-auto" />
                    <span class="my-auto">回答者</span>
                  </div>
                </a>
              </li>
            </ul>
          </nav>
          <div v-else class="mt-1.5">
            <NuxtLink :to="'/how-to-play'">
              <MbqButtonPrimary
                ><div class="flex">
                  <nintendo-game-boy-icon /><span class="ml-3"
                    >遊び方を見る</span
                  >
                </div></MbqButtonPrimary
              >
            </NuxtLink>
          </div>
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
                :to="'/how-to-play'"
                class="block w-full py-2 text-left pl-3"
              >
                <div class="flex">
                  <nintendo-game-boy-icon /><span class="ml-3"
                    >遊び方を見る</span
                  >
                </div>
              </NuxtLink>
            </li>
            <li>
              <button
                id="logout-button"
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
                :to="'/withdrawal-confirmation'"
                class="block w-full py-3 text-left pl-3"
              >
                <div class="flex">
                  <hand-wave-outline-icon /><span class="ml-3">退会</span>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
  <slot />
</template>
