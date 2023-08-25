<script setup lang="ts">
  import BaseballDiamondOutlineIcon from 'vue-material-design-icons/BaseballDiamondOutline.vue'
  import LogoutIcon from 'vue-material-design-icons/Logout.vue'
  import HandWaveOutlineIcon from 'vue-material-design-icons/HandWaveOutline.vue'

  const emits = defineEmits<{
    (e: 'logout'): void
  }>()

  const { currentUser } = useCurrentUser()

  const logout = () => {
    emits('logout')
  }
</script>

<template>
  <header class="bg-white px-3 fixed w-full z-10 border-b h-[70px]">
    <div class="flex items-center justify-between">
      <div>
        <MbqBrand href="/home"></MbqBrand>
      </div>
      <div class="flex h-[69px]">
        <div class="dropdown dropdown-end dropdown-hover my-3">
          <MbqUserIcon :currentUser="currentUser" tabindex="0"></MbqUserIcon>
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
                  <baseball-diamond-outline-icon /><span class="ml-3"
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
