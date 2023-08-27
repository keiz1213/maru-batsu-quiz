<script setup lang="ts">
  import BaseballDiamondOutlineIcon from 'vue-material-design-icons/BaseballDiamondOutline.vue'
  import ChatQuestionOutlineIcon from 'vue-material-design-icons/ChatQuestionOutline.vue'
  import ChatAlertOutlineIcon from 'vue-material-design-icons/ChatAlertOutline.vue'

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
          <nav v-if="route.path === '/how-to-play'">
            <ul class="flex gap-1">
              <li>
                <a class="block" href="#questioner">
                  <div
                    class="flex h-[69px] p-3 hover:bg-purple-100 hover:cursor-pointer"
                  >
                    <chat-question-outline-icon class="my-auto" />
                    <span class="my-auto">出題者</span>
                  </div>
                </a>
              </li>
              <li>
                <a class="block" href="#answerer">
                  <div
                    class="flex h-[69px] p-3 hover:bg-purple-100 hover:cursor-pointer"
                  >
                    <chat-alert-outline-icon class="my-auto" />
                    <span class="my-auto">回答者</span>
                  </div>
                </a>
              </li>
            </ul>
          </nav>
          <NuxtLink v-else :to="'/how-to-play'">
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
