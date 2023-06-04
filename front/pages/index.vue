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
    <button @click="login">Githubでログイン</button>
  </div>
</template>
