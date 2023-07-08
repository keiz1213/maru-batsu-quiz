<script setup lang="ts">
  useHead({
    titleTemplate: (title) => {
      return title
        ? `${title} | マルバツクイズオンライン`
        : 'マルバツクイズオンライン'
    }
  })

  useSeoMeta({
    description:
      'オンラインでマルバツクイズが遊べるサービスです。誰が、どれくらいの人数の人が、○ or ✗ と答えているか、また回答に迷っている様子がリアルタイムで見れる機能が備わっています。',
    ogTitle: 'マルバツクイズオンライン',
    ogType: 'website',
    ogSiteName: 'マルバツクイズオンライン',
    ogDescription:
      'オンラインでマルバツクイズが遊べるサービスです。誰が、どれくらいの人数の人が、○ or ✗ と答えているか、また回答に迷っている様子がリアルタイムで見れる機能が備わっています。',
    ogImage: '#',
    ogUrl: '#',
    twitterCard: 'summary',
    twitterDescription:
      'オンラインでマルバツクイズが遊べるサービスです。誰が、どれくらいの人数の人が、○ or ✗ と答えているか、また回答に迷っている様子がリアルタイムで見れる機能が備わっています。',
    twitterImage: '#'
  })

  const { signOut } = useAuth()
  const { toast, setToast, unsetToast, notify } = useToast()
  const route = useRoute()

  const logout = async (): Promise<void> => {
    await signOut()
    setToast('ログアウトしました！', 'success')
    navigateTo('/')
  }

  watch(route, () => {
    if (toast.value.isSet) {
      notify(toast.value.message, toast.value.type)
      unsetToast()
    }
  })
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <MbqNavBar @logout="logout"></MbqNavBar>
    <slot />
    <MbqFooter class="mt-auto"></MbqFooter>
  </div>
</template>
