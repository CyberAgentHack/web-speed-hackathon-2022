# API 仕様

## 認証仕様

1. 未ログイン状態で`/users/me` を呼ぶと、ユーザーが作成されて返される
2. 2 回目以降は `X-App-UserId` ヘッダにユーザー ID をセットしてリクエストすると、そのユーザーとして API を叩くことができる

※スコア測定時は、初回アクセス（未ログイン）状態での計測となります

## GET /races

レース一覧の取得

- 認証: 不要
- クエリ

  - `since`: 指定時刻以降(指定時刻を含む)のレースを取得する。UNIX タイムスタンプ（秒）で指定する。(ex. `1646406786`)
  - `until`: 指定時刻以前(指定時刻を含む)のレースを取得する。UNIX タイムスタンプ（秒）で指定する。(ex. `1646406786`)

- レスポンス

`200`

なお、オッズや出走表などの一部フィールドは一覧では省略されています

```json
{
  "races": [
    {
      // Race
      "id": "race1",
      "name": "勝利へポン！カップ",
      "startAt": "2022-03-04T00:20:00Z",
      "closeAt": "2022-03-04T00:20:00Z",
    },
    {
      // Race
      "id": "race2",
      "name": "じゃんけんグランプリ2022",
      "startAt": "2022-03-04T00:20:00Z",
      "closeAt": "2022-03-04T00:20:00Z",
      ...
    }
  ]
}
```

`400`: UNIX タイムスタンプ（秒）以外の形式が since/until クエリに入っていた場合

### GET /races/:raceId

特定レースの詳細の取得

- 認証: 不要
- クエリ: 特になし
- レスポンス

`200`: 該当レースが存在する場合

```json
{
  // Race
  "id": "50ce2943-7d80-4e7c-ab16-719df20080f0",
  "image": "/assets/images/races/001.jpg",
  "name": "白馬カップ",
  "startAt": "2022-03-04T00:20:00Z",
  "closeAt": "2022-03-04T00:20:00Z",
  "entries": [
    {
      "comment": "なんかいけそう",
      "first": 9,
      "firstRate": 33.33333333333333,
      "id": "322a4313-6f03-476a-8b9a-0ee9b247120f",
      "number": 1,
      "others": 9,
      "paperWin": 5,
      "player": {"id": "ca26265d-a1c8-4f17-932d-bbd3da520614", "name": "伊藤松夫", "shortName": "伊藤松", ...},
      "predictionMark": "",
      "rockWin": 2,
      "scissorsWin": 2,
      "second": 6,
      "third": 3,
      "thirdRate": 66.66666666666667
    },
    ...
  ],
  "trifectaOdds": [
    {
      "id": "000dab5c-64ab-45a8-821d-3b92082ff966",
      "key": [8, 1, 5],
      "odds": 180.5,
      "type": "trifecta"
    },
    ...
  ]
}
```

`404`: 該当レースが存在しない場合（ボディは空）

### GET /races/:raceId/betting-tickets

特定レースについて購入した拳券の取得

- 認証: 必須
- クエリ: 特になし
- レスポンス

`200`: 1→2→3 の 3 連単を 1 個買っている場合

```json
{
  "bettingTickets": [
    {
      "id": "ticket1",
      "type": "trifecta",
      "key": [1, 2, 3]
    }
  ]
}
```

`200`: 該当レースを何も買っていない場合

```json
{
  "bettingTickets": []
}
```

`412`: チャージ金額が不足している場合

### POST /races/:raceId/betting-tickets

特定レースの拳券の購入

- 認証: 必須
- リクエストボディ: 1→2→3 の 3 連単を購入する場合

```json
{
  "type": "trifecta",
  "key": [1, 2, 3]
}
```

- レスポンス

`200`: 購入に成功した場合

```json
{
  "id": "ticket1",
  "type": "trifecta",
  "key": [1, 2, 3]
}
```

### POST /initialize

ベンチマーク前のデータ初期化

- 認証: 不要
- リクエストボディ: なし
- レスポンス

`204`: 初期化に成功した場合（ボディは空）
