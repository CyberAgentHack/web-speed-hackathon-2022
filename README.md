# Web Speed Hackathon 2022

## 概要

**"Web Speed Hackathon 2022" は、非常に重たい Web アプリをチューニングして、いかに高速にするかを競う競技です。**

「Web Speed Hackathon」はリモート参加型のハッカソンです。 予め準備してある Web アプリケーションのパフォーマンスを改善することで競い合います。

## 課題

今回のテーマは、架空のベッティングサービス(勝者を予想して投票するサービス)「CyberTicket」です。
CyberTicket のパフォーマンスを改善してください。

**なお、このアプリケーションは日本国内の法律に基づく実際の運用を意図していない架空のサービスであり、実在する団体・会社とは一切関係ありません。**

- デモサイト: https://web-speed-hackathon-2022.herokuapp.com/
- リーダーボード (順位表): https://github.com/CyberAgentHack/web-speed-hackathon-2022-leaderboard

[過去に開催した学生向け / 社内向け Web Speed Hackathon 2022 についてはこちら](./docs/internal/README.md)

## 参加方法

- 開催期間 | **2022/11/1 (火) – 2022/11/27 (日)**
- 参加資格 | **どなたでも自由に参加できます**

1. **レギュレーション・注意事項をよく読んで、問題なければ同意します**
   - [レギュレーション](./docs/REGULATION.md)
   - [注意事項](#注意事項)
1. **課題のソースコードを fork します**
   - https://github.com/CyberAgentHack/web-speed-hackathon-2022
1. **アプリケーションをデプロイして、URL を提出します**
   - [提出フォーム](https://github.com/CyberAgentHack/web-speed-hackathon-2022-leaderboard/issues/new/choose)
1. **自動で計測されて、リーダーボードに反映されます**
   - よければ、採点結果を **#WebSpeedHackathon** で Twitter に投稿してください
1. **開催期間中の参加記事や解説記事、大歓迎です！**
   - 他の人の解説記事や参加記事を読んで、更に高速なアプリを目指しましょう

### 以前の Web Speed Hackathon 2022 参加者のかたへ

開催形式の変更に伴い、以前の Web Speed Hackathon 2022 から、いくつかの変更点があります。

:warning: **以前の Web Speed Hackathon 2022 のコードでは参加いただけません。ご了承ください。**

<details>
<summary>主な変更点</summary>

- Node.js 、ライブラリのバージョンをアップデートしました
- 開催期間に合わせてデータの再生成を行いました
- `TrimmedImage` のレスポンシブ時の挙動を修正しました
- LICENSE を Mozilla Public License 2.0 と明記しました
- その他、軽微なコードの調整をしました

</details>

## 注意事項

- **GitHub issue による参加登録フローであるため、GitHub アカウント名が一般に公開されます**
- 既に学生採用イベント・社内イベントで開催している都合上、優勝賞品はありません
- 開催期間が長期間であるため、計測がうまく行かない場合の対応は、ベストエフォートになります

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

## 開発方法

開発に必要なドキュメントは、[./docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) を参照してください。

## API 仕様書

API 仕様書は、[./docs/API.md](./docs/API.md)を参照してください。

## ライセンス

- Code: Mozilla Public License 2.0 (CyberAgent, Inc.)
- Image data: Unsplash License
- Color theme: MIT License (Tailwind Labs, Inc.)
- Font: SIL Open Font License (MODI 工場／倒神神倒)
