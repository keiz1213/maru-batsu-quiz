# ○×クイズオンライン(API)
こちらは[○×クイズオンライン](https://github.com/keiz1213/maru-batsu-quiz)のAPIリポジトリです。

## 開発環境(API)
### 言語・フレームワーク
- Ruby 3.2.2
- Ruby on Rails 7.0.5
### 環境構築
- Docker
- Docker Compose
### インフラ
- [fly.io](https://fly.io/)
### テスト
- RSpec
### リンター・フォーマッター
- RuboCop
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
※Docker、docker-composeが必要になります
```
$ docker-compose build
$ docker-compose run --rm api bin/rails db:create
$ docker-compose run --rm api bin/rails db:migrate
```
## テスト
```
$ docker-compose run --rm api bundle exec rspec
```
## Lint
```
$ docker-compose run --rm api bundle exec rubocop
```
