<script setup lang="ts">
  import MbqButtonGithub from '~/components/atoms/MbqButtonGithub.vue'

  const { githubLogin } = useAuth()
  const { toast, setToast, unsetToast, notifyOnSpot, notify } = useToast()

  const login = async () => {
    try {
      isLoading.value = true
      await githubLogin()
      setToast('ログインしました！', 'success')
      navigateTo('/home')
    } catch {
      isLoading.value = false
      notifyOnSpot('ログインに失敗しました', 'error')
    }
  }

  const isLoading = ref(false)

  if (toast.value.isSet) {
    notify(toast.value.message, toast.value.type)
    unsetToast()
  }
</script>

<template>
  <div class="bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full h-screen">
    <MbqButtonGithub :onClick="login" :isLoading="isLoading"
      >GitHubでログイン</MbqButtonGithub
    >
  </div>
</template>
