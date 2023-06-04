<template>
  <div class="mt-20 px-3 py-0 w-full border-t">
    <footer>
      <div>
        <nav class="">
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
