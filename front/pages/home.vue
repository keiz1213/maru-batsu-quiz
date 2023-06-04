<script setup lang="ts">
  const { signOut } = useAuth()
  const { currentUser } = useAuth()
  const logout = async (): Promise<void> => {
    await signOut()
    navigateTo('/', { replace: true })
    console.log('logoutしました')
  }
</script>

<template>
  <div>
    <div>
      <h1>Home</h1>
    </div>
    <button @click="logout">logoutする</button>
    {{ currentUser.name }}
  </div>
</template>
