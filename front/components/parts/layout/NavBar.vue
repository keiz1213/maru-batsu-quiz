<script setup lang="ts">
  import BaseballDiamondOutlineIcon from 'vue-material-design-icons/BaseballDiamondOutline.vue'

  const route = useRoute()
</script>

<template>
  <header class="bg-white px-3 fixed w-full z-10 border-b h-[70px]">
    <div class="flex items-center justify-between">
      <div>
        <NuxtLink :to="'/'">
          <img
            src="../../../assets/images/logo.png"
            width="150"
            height="100"
            alt="logo"
          />
        </NuxtLink>
      </div>
      <div class="flex h-[69px]">
        <div>
          <NuxtLink v-if="route.path === '/'" :to="'/how-to-play'">
            <div class="my-2.5 mr-2 btn btn-outline btn-primary">
              <div class="flex justify-center">
                <baseball-diamond-outline-icon class="mt-0.5" />
                <span class="text-xl ml-1">HOW TO PLAY</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
  <slot />
</template>
