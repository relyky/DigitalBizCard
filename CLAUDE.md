# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案狀態

DigitalBizCard 是員工電子名片分享網站。第一階段施工中，進度見 `.docs/progress.md`。

## 指令

Next.js 16（App Router、TypeScript、無 Tailwind），Node >= 20.9.0（開發環境 v24）。套件管理用 npm。

```bash
npm run dev     # 開發伺服器 http://localhost:3000
npm run build   # 正式建置
npm run lint    # ESLint
npm test        # Vitest（vitest run，跑完即結束）
npx vitest run src/lib/cards.test.ts   # 執行單一測試檔
npx vitest run -t "不存在的 uuid"       # 依測試名稱篩選
```

## 程式結構

- `src/cards/*.marp.md`：名片 Marp 來源檔（從 `.docs/raw/` 複製，程式不讀 `.docs/`）。
- `src/lib/cards.ts`：寫死的 uuid → Marp 檔對照，`findCardMarkdown(uuid)` 找不到回傳 `null`。
- `src/lib/render.ts`：`renderCard(uuid)` 用 `@marp-team/marp-core` 轉成 `{ html, css }`，找不到回傳 `null`。
- `src/app/bizcard/[uuid]/page.tsx`：`renderCard` 為 `null` 時 `notFound()`（404）；否則輸出 Marp 的 CSS 與 HTML。每頁投影片是 1280×720 的 SVG，用 `width:100%` 等比縮放。
- `globals.css` 只保留 `body` 的邊距與底色。不要加全域重設規則（例如 `* { margin:0; padding:0 }`），以免影響 Marp 樣式。
- 計算投影片頁數時要數 `<svg data-marpit-svg`，不能數 `<section>`：`bg left/right` 背景圖會多產生 section。
- 開發伺服器執行中安裝套件後，若頁面沒有反映程式修改，就重啟 `npm run dev`。

## 文件結構

```
.docs/
├── raw/                    原始素材：需求文件、對話、筆記、Marp 範例
├── product-requirements.md 高抽象層級的產品規格與願景
├── tech-stack.md           技術選型與架構藍圖
├── implementation-plan.md  施工地圖
└── progress.md             動態進度
src/                        程式碼
```

目前已有 `raw/`、`product-requirements.md`、`tech-stack.md`、`implementation-plan.md`、`progress.md`。產品規格以 `product-requirements.md` 為準，原始需求見 `raw/DigitalBizCard_requirement.md`。

## 產品與技術方向（出自需求文件）

- 第一階段：用 Next.js 做獨立小網站，只負責把員工電子名片分享給客戶；把 Marp 範例渲染成網頁；確認可行後才規劃第二階段（員工名片資料維護）。第二階段尚未規劃，不要預先實作。
- 預計網址：`http://localhost:3000/bizcard/<staff-shared-uuid>`。
- 資料庫 SQLite3，暫定資料表 `biz_card`、`staff_headshot`（schema 見需求文件）。**第一階段不需要資料表**。
- 暫定部署：IIS 上部署 Next.js。
- 需渲染兩種 QR code：`line_me`（加 LINE 好友）與 `vcard_cnt`（vCard 聯絡資訊）。

## Marp 範例慣例

`.docs/raw/電子名片範例_*.marp.md`（甄美麗、艾漂亮、郝聰明、高又壯）是第一階段的渲染目標，每份結構相同：

- 首頁（`cover` class）：頭像（`![bg left:38%]`）、姓名、英文名、職稱與專長。
- 內頁以 `---` 分隔：主治專長、學歷、經歷、專科證書、LINE 加好友、加入通訊錄。
- 樣式寫在檔頭 front matter 的 `style:`，目前 4 份都使用同一主題色 `#bf4690`。
- QR code 目前以外部服務 `api.qrserver.com` 產圖；LINE 連結與 vCard 資料多為佔位的範例值。vCard 內容經 URL encode 後放在 `data=`，電話的 `+` 必須寫成 `%2B`。
- 加入通訊錄頁的版面：`![bg right:35% w:320](…)` 把 QR code 放右側，左側為條列聯絡資料；頁內的 `/vcard/*.vcf` 連結是無效的測試連結，第一階段不實作。

## 慣例

- 檔案一律 UTF-8。
- 溝通與文件以繁體中文為主。
