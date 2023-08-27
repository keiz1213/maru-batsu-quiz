<script setup lang="ts">
  useHead({
    title: 'プライバシーポリシー',
    meta: [
      {
        name: 'description',
        content: 'プライバシーポリシー'
      },
      {
        name: 'og:title',
        content: 'プライバシーポリシー'
      },
      {
        name: 'og:description',
        content: 'プライバシーポリシー'
      }
    ]
  })
</script>

<template>
  <TheContainer>
    <div class="flex flex-col gap-10">
      <MbqH1>プライバシーポリシー</MbqH1>
      <div>
        <h2>
          このプライバシーポリシーは、○✗クイズオンライン（以下「本サービス」といいます）の利用に関する個人情報の取り扱いについて説明します。本サービスをご利用いただく際には、以下の内容をご確認いただき、同意していただく必要があります。
        </h2>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-3">第1条 (収集する情報)</h3>
        <p class="mb-3">本サービスでは、以下の情報を収集することがあります。</p>
        <ul class="list-decimal ml-10">
          <li>GitHubアカウント情報（ユーザー名、メールアドレスなど）</li>
          <li>クイズの回答履歴や成績などのゲームプレイ情報</li>
        </ul>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-3">第2条 (収集する目的)</h3>
        <p class="mb-3">収集した情報は、以下の目的で利用されます。</p>
        <ul class="list-decimal ml-10">
          <li>ユーザーの認証およびアカウント管理</li>
          <li>サービスの改善および新機能の開発</li>
        </ul>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-3">
          第3条 (情報の共有と第三者への提供)
        </h3>
        <p class="mb-3">
          本サービスでは、ユーザーの個人情報を適切に保護し、第三者に提供することはありません。ただし、法的な要求や規制に基づく場合、またはユーザーの同意がある場合に限り、情報を提供することがあります。
        </p>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-3">第4条 (セキュリティ対策)</h3>
        <p class="mb-3">
          本サービスでは、ユーザーの個人情報の機密性を保護するために適切なセキュリティ対策を実施しています。情報の不正アクセス、紛失、漏洩、改ざんなどに対するリスクを最小限に抑えるために努力しています。
        </p>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-3">第5条 (Cookieの使用)</h3>
        <p class="mb-3">
          本サービスでは、一部の機能や利便性の向上のためにCookieを使用する場合があります。これにより、ユーザーのプリファレンスやセッション情報が保存されます。Cookieに関する詳細やオプトアウトの方法については、ブラウザの設定をご確認ください。
        </p>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-3">第6条 (外部リンク)</h3>
        <p class="mb-3">
          本サービスは、他のウェブサイトへのリンクを含む場合があります。外部サイトへのアクセスや利用に関しては、本プライバシーポリシーは適用されず、それぞれのサイトのプライバシーポリシーをご確認ください。
        </p>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-3">
          第7条 (プライバシーポリシーの変更)
        </h3>
        <p class="mb-3">
          本サービスでは、プライバシーポリシーを必要に応じて変更する場合があります。重要な変更がある場合には、ユーザーに通知する方法を適切に採用します。
        </p>
      </div>
      <span class="mt-16 text-2xl underline hover:cursor-pointer w-20"
        ><NuxtLink :to="'/'">←Top</NuxtLink></span
      >
    </div>
  </TheContainer>
</template>

<style scoped>
  li {
    padding-top: 5px;
    padding-bottom: 5px;
  }
</style>
