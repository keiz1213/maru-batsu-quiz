<script setup lang="ts">
  const name = ref<string>('World')
  const { githubLogin } = useAuth()

  const login = async () => {
    await githubLogin()
    navigateTo('/home', { replace: true })
    console.log('loginしました')
  }
</script>

<template>
  <div>
    <input v-model="name" type="text" />
    <Helloworld :name="name" />
    <GetHello />
    <button
      class="text-white rounded-md bg-green-600 py-4 px-4 text-sm shadow-md hover:opacity-70 w-48"
      @click="login"
    >
      Githubでログイン
    </button>
  </div>
</template>
