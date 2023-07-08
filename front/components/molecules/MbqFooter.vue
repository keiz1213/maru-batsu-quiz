<template>
  <div class="w-full border-t pt-5">
    <footer>
      <div>
        <nav>
          <ul class="flex justify-center">
            <li class="p-4"><NuxtLink :to="'/terms'">利用規約</NuxtLink></li>
            <li class="p-4">
              <NuxtLink :to="'/privacy'">プライバシーポリシー</NuxtLink>
            </li>
            <li class="p-4"><NuxtLink :to="'#'">GitHub</NuxtLink></li>
          </ul>
        </nav>
      </div>
      <div class="text-center p-4">
        <p>©2023 Nakamura</p>
      </div>
    </footer>
  </div>
</template>
