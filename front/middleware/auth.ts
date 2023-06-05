export default defineNuxtRouteMiddleware(async () => {
  const { checkAuthState, currentUser } = useAuth()
  await checkAuthState()
  // if (currentUser.value.uid === '') {
  //   console.log('ログイン状態を確認できません by middleware: checkAuth')
  //   return await navigateTo('/login')
  // }
})
