# 技術選型與架構

依據 `product-requirements.md`。「建議」是我提出、尚未經你確認的選擇；其餘出自 `.docs/raw/DigitalBizCard_requirement.md`。

## 選型

| 項目 | 選擇 | 階段 | 來源 |
|---|---|---|---|
| Web 框架 | Next.js | 第一階段 | 需求文件 |
| Marp 渲染 | `@marp-team/marp-core`，於伺服器端把 Markdown 轉成 HTML 與 CSS | 第一階段 | 建議 |
| QR code | 外部服務 `api.qrserver.com`（假資料） | 第一階段 | 需求文件 |
| QR code | 本機產生的 qrcode 套件（套件待選） | 第二階段 | 需求文件 |
| 資料庫 | SQLite3 | 第二階段 | 需求文件 |
| 部署 | IIS 上部署 Next.js | 暫定 | 需求文件 |

## 第一階段架構

```
GET /bizcard/<uuid>
  → 以寫死的 uuid 對照表找出 Marp 檔
  → 找不到：回 404
  → 找到：讀檔 → marp-core 渲染 → 輸出網頁
```

- **uuid 對照表**：寫死在程式碼，內容見 `product-requirements.md` 的暫定 uuid 對應。
- **Marp 來源檔**：第一階段直接讀 4 份範例（郝聰明、甄美麗、艾漂亮、高又壯）。目前放在 `.docs/raw/`，程式要讀的檔案建議複製到 `src/` 下，不直接依賴 `.docs/raw/`。
- **QR code**：圖片網址寫在 Marp 檔內（`api.qrserver.com`），不需要額外程式。
- **無資料庫、無登入、無存取控制**。

## 第二階段（尚未規劃）

資料改存 SQLite3（`biz_card`、`staff_headshot`），QR code 改本機產生。細節待第一階段完成後再規劃，現在不預先實作。

## 風險與待驗證

- 範例使用 Marp 進階語法：`![bg left:38%]`、`![bg right:42% w:320]`、檔頭 `style:`、`<!-- _class: cover -->`。需驗證 `marp-core` 輸出與 marp.live 預覽一致，這也是成功標準之一。
- 渲染結果要放進 Next.js 頁面時，Marp 的 CSS 可能與頁面樣式互相影響，需驗證是否要隔離（例如放進 iframe）。
- 外部圖片（頭像、`api.qrserver.com`）需要可連外網。
- 在 IIS 上跑 Next.js 的方式與限制，尚未驗證。

## 待確認

- 是否採用 `@marp-team/marp-core`（或指定其他套件）。
- 是否採用 Next.js App Router。
