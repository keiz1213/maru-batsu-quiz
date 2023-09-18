# ○× クイズオンライン(フロントエンド)

こちらは[○× クイズオンライン](https://github.com/keiz1213/maru-batsu-quiz)のフロントエンドリポジトリです。

## 開発環境(フロントエンド)

### 言語・フレームワーク

- Nuxt.js 3.5.2
- TypeScript
- Tailwind CSS
- daisyUI

### 環境構築

- Docker
- Docker Compose

### インフラ

- [vercel](https://vercel.com/)

### テスト

- Vitest
- Cypress

### リンター・フォーマッター

- ESLint
- Prettier

### 外部サービス

- [SkyWay](https://skyway.ntt.com/ja/)
- [Firebase Authentication](https://firebase.google.com/?hl=ja)

## 環境構築

### 環境変数

ルートディレクトリで以下のように`.env`に環境変数を設定してください

```
$ touch .env
```

```
# common
CONTAINER_PORT=3000
API_PORT=3000
FRONT_PORT=8080

# firebase
FIREBASE_API_KEY=<firebase-api-key>
FIREBASE_AUTH_DOMAIN=<firebase-auth-domain>
FIREBASE_PROJECT_ID<firebase-project-id>

# skyway
SKYWAY_ID=<skyway-id>
SKYWAY_SECRET=<skyway-secret>
```

[SkyWay](https://skyway.ntt.com/ja/)  
[Firebase Authentication](https://firebase.google.com/?hl=ja)

### セットアップ

※Docker、docker-compose が必要になります

```
$ docker-compose build
$ docker-compose run --rm front npm install
```

## テスト

### Cypress でテストを行うために`front`ディレクトリに以下のファイルを作成してください

cypress.env.json

```
{
  "FIREBASE_API_KEY": "<firebase-api-key>",
  "FIREBASE_AUTH_DOMAIN": "<firebase-auth-domain>",
  "FIREBASE_PROJECT_ID": "<firebase-project-id>",
  "TEST_UID": "<test-uid>"
}
```

serviceAccount.json

```
{
  "type": "<type>",
  "project_id": "<project-id>",
  "private_key_id": "<private-key-id>",
  "private_key": "<private-key>",
  "client_email": "<client-email>",
  "client_id": "<client-id>",
  "auth_uri": "<auth-uri>",
  "token_uri": "<token-uri>",
  "auth_provider_x509_cert_url": "<auth-provider-x509-cert-url>",
  "client_x509_cert_url": "<client-x509-cert-url>",
  "universe_domain": "<universe-domain>"
}
```

[Firebase Authentication](https://firebase.google.com/?hl=ja)

### 単体テスト

```
$ docker-compose run --rm npm run test:unit
```

### E2E テスト

```
$ docker-compose up
$ cd front
$ npm run test:e2e
```

## Lint

```
$ docker-compose run --rm npm run lint
```
