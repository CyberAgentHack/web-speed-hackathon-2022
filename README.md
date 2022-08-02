# Web Speed Hackathon 2022

## [DO NOT MERGE] dora test

## 概要

**"Web Speed Hackathon 2022" は、非常に重たい Web アプリをチューニングして、いかに高速にするかを競う競技です。**

「Web Speed Hackathon」はリモート参加型のハッカソンです。 予め準備してある Web アプリケーションのパフォーマンスを改善することで競い合います。

- 募集要項: https://www.cyberagent.co.jp/careers/students/career_event/detail/id=27181

## 課題

今回のテーマは、架空のベッティングサービス(勝者を予想して投票するサービス)「CyberTicket」です。
後述のレギュレーションを守った上で、CyberTicket のパフォーマンスを改善してください。

- デモサイト: https://web-speed-hackathon-2022.herokuapp.com/
- リーダーボード (順位表): https://github.com/CyberAgentHack/web-speed-hackathon-2022-leaderboard

## 提出方法

評価対象となる環境（URL）を作成し、以下のレポジトリから参加登録を行なってください。

https://github.com/CyberAgentHack/web-speed-hackathon-2022-leaderboard

## デプロイ

提出用環境の作成は、以下のいずれかの手順でローカルのアプリケーションをデプロイすることで行えます。

### Heroku へデプロイする場合

1. このレポジトリを自分のレポジトリに fork します
   - https://docs.github.com/ja/github/getting-started-with-github/fork-a-repo
2. Heroku のアカウントを持っていない場合、作成します
3. 自分のレポジトリを Heroku に連携させ、デプロイを設定します
   - https://devcenter.heroku.com/ja/articles/github-integration

### Heroku の無料枠が残っていないが Heroku を使いたい場合

- 運営で用意している Heroku アカウントから Heroku Review App によるデプロイが使えます
- このレポジトリに向けて Pull Request を投げると自動的にデプロイが完了します
  - この方法では、デプロイ時のログを自分で確認できません
  - デプロイ失敗時には、ログを運営に問い合わせることができます
- 可能であれば、自前で別のサービスにデプロイすることをオススメします
  - ただし、Heroku 外へのデプロイについて、運営からサポートしません

### Heroku 外へデプロイする場合

- 無料の範囲内であれば、Heroku 以外へデプロイしてもかまいません
  - **外部のサービスは全て無料枠の範囲内で使用してください。万が一コストが発生した場合は、全て自己負担となります。**
  - Heroku 外へのデプロイについて、運営からサポートしません
  - デプロイ方法がわからない方は Heroku で立ち上げることをオススメします

## 採点

採点は GitHub Actions を用いて、参加登録がされた時点および参加者が採点を要求した任意の時点で行われます。

スコアは GitHub Actions 上の最新版 [Lighthouse](https://github.com/GoogleChrome/lighthouse) を使って以下のように算出されます。

1. Lighthouse により次の 5 ページを検査します
   - トップページ
   - 出走表ページ
   - オッズページ x 2
   - 結果ページ
2. 各メトリクスに対して [Lighthouse のスコア計算方法](https://web.dev/performance-scoring/#lighthouse-8) と同じ重み付けを使用し、以下の総和をページのスコアとします (0-100 点) ※
   - First Contentful Paint のスコア × 10 (0-10 点)
   - Speed Index のスコア × 10 (0-10 点)
   - Largest Contentful Paint のスコア × 25 (0-25 点)
   - Time To Interactive のスコア × 10 (0-10 点)
   - Total Blocking Time のスコア × 30 (0-30 点)
   - Cumulative Layout Shift のスコア × 15 (0-15 点)
3. 各ページのスコアを合算し、参加者のスコアとします

※重み付けが同じなので、ページのスコアは Lighthouse が出すスコアと一致します。ただし、Lighthouse のスコアは整数に丸められているのに対し、本競技のスコアは丸める前の値をそのまま使用しています。

## レギュレーション

以下のレギュレーションに違反した場合には、順位対象外となります。

- レポジトリにあるコード・ファイル・API が返却する内容は、機能落ちにならない範囲ですべて変更してよい
  - 機能落ち = ユーザーがサービスから得られる情報が変わってしまう状態
- 外部のサービス（SaaS など）を無料の範囲で自由に利用してよい
  - デプロイ先も自由に変えてかまいません（Heroku へのデプロイのみサポートします）
  - 無料で使えるサービスは https://free-for.dev/ などで調べられます
  - 万が一費用が発生した場合には、全額自己負担となります
- Google Chrome 最新版において、著しい機能落ちやデザイン差異を発生させてはいけない
- 運営は原則として Heroku へのデプロイ以外の質問には返答しません

機能落ちの判定には主に以下の基準を用いますが、これに限りません。

- a) ページ読み込み完了時のデザイン差異がないこと
  - フォントファミリー・文字サイズ・ウェイトに差異がない
  - 画像の著しい劣化がない
  - 画像の解像度を表示領域より低くしない
  - ウィンドウ幅を拡縮したときの挙動に差異がない
  - その他、見た目上で著しい変化がない
- b) ページをスクロールしたとき、得られる情報に差異がないこと
- c) サービスの機能を著しく損なわないこと
  - ページの遷移が正しく行える
  - レースの一覧、出走表・オッズ・結果の詳細表示などが正しく行える
  - ログインができる
  - チャージや拳券の購入などの機能が正しく動作する
- d) API が返却した内容とページで表示される内容に差異がないこと
- e) もとのレポジトリと比較して、API が返却する内容に欠損がないこと
  - ただし、API が返却する内容に新しい項目を追加することは許可します

レギュレーション違反のチェックは主に二段階で行われます。

1. GitHub Actions で採点が行われる際、VRT (Visual Regression Test) によってデザインの差分がないかがチェックされます。この自動テストに失敗すると、上記 a) に違反したものとしてリーダーボードの掲載対象外となります。
2. 競技終了後、リーダーボードで上位にランクインしたアプリケーションについて、上記基準に抵触していないか運営により手動でチェックします。

## 開発方法

### 環境

- Node.js (v16 以上)
- yarn

### コマンド

最低限のコマンドだけ記載します。
それ以外については、各フォルダの `package.json` を参照してください。

#### 準備

```bash
yarn install
```

#### ビルド

```bash
yarn build
```

#### サーバーの起動

標準では `http://localhost:3000` でアクセスできます。

```bash
yarn serve
```

#### 開発環境の起動

ファイル変更時にクライアント・サーバー両方のビルドと再起動が自動で行われます。
**ホットリロードはありません**ので、変更をブラウザで確認するには変更後にリロードしてください。

標準では `http://localhost:3000` でアクセスできます。

```bash
yarn dev
```

## API 仕様書

API 仕様書は、[./docs/API.md](./docs/API.md)を参照してください。

## ライセンス

- Code: (c) CyberAgent, Inc.
- Image data: Unsplash License by https://unsplash.com/
- Color theme: Tailwind CSS by Tailwind Labs, Inc. https://tailwindcss.com/
- Fonts
  - せのびゴシック ver.1.00 by MODI 工場／倒神神倒 http://modi.jpn.org/font_senobi.php
