<template>
  <footer class="w-full pt-5">
    <div>
      <nav>
        <ul
          class="text-xs grid grid-cols-2 border-t md:flex md:justify-center md:text-base"
        >
          <li class="p-5"><NuxtLink :to="'/terms'">利用規約</NuxtLink></li>
          <li class="p-5">
            <NuxtLink :to="'/privacy'">プライバシーポリシー</NuxtLink>
          </li>
          <li class="p-5">
            Illustration by
            <a href="https://icons8.com/illustrations/author/zD2oqC8lLBBA"
              >Icons 8</a
            >
            from <a href="https://icons8.com/illustrations">Ouch!</a>
          </li>
          <li class="p-4 pl-5">
            <NuxtLink :to="'https://github.com/keiz1213/maru-batsu-quiz'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="30"
                height="30"
              >
                <path
                  d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
                ></path>
              </svg>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
    <div class="text-center p-4">
      <p>©2023 Nakamura</p>
    </div>
  </footer>
</template>
