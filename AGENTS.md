<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

本檔提供 AI 程式助理（Claude Code 等）在此專案工作時的指引。

## 專案狀態

DigitalBizCard 是員工電子名片分享網站。第一階段已完成並確認可行；第二階段規劃中。進度見 `.docs/progress.md`。

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

- `src/cards/*.marp.md`：名片 Marp 來源檔（程式不讀 `.docs/`）。
- `src/lib/cards.ts`：寫死的 uuid → Marp 檔對照（`CARD_FILES`），`findCardMarkdown(uuid)` 找不到回傳 `null`。新增名片要同時放 `.marp.md` 檔並在 `CARD_FILES` 加一筆。
  - Marp 檔在執行時以 `path.join(process.cwd(), "src", "cards")` 讀取：`next start` 或 IIS 部署時工作目錄必須是專案根目錄，且 `src/cards/` 要一併部署。
  - 測試網址：`/bizcard/a1123456789012345678901234567890`（郝聰明）、`b2…`（甄美麗）、`c3…`（艾漂亮）、`d4…`（高又壯），uuid 其餘部分相同。
- `src/lib/render.ts`：`renderCard(uuid)` 用 `@marp-team/marp-core` 轉成 `{ landscape, portrait }`（各為 `{ html, css }`），找不到回傳 `null`。
  - `landscape`：原樣渲染，1280×720。
  - `portrait`：手機用的 720×1280 直式版。覆寫 `default` 主題的尺寸並追加直式 CSS；容器 class 為 `marpit-portrait`（橫式為 `marpit`），兩份 CSS 才不會互相干擾。渲染前把 `![bg left/right:N%]` 改成一般圖片（封面照片移到上方、通訊錄 QR code 排入內容），因為直式寬度放不下左右分割。
- `src/app/bizcard/[uuid]/page.tsx`：`renderCard` 為 `null` 時 `notFound()`（404）；否則同時輸出橫式與直式兩份，`page.module.css` 以 `@media (max-width: 600px)` 切換（平板以上維持橫式）。每頁投影片是 SVG，用 `width:100%` 等比縮放。
- `globals.css` 只保留 `body` 的邊距與底色。不要加全域重設規則（例如 `* { margin:0; padding:0 }`），以免影響 Marp 樣式。
- 計算投影片頁數時要數 `<svg data-marpit-svg`，不能數 `<section>`：`bg left/right` 背景圖會多產生 section。
- Vitest 的 `@` → `src` 別名另設於 `vitest.config.ts`（不讀 `tsconfig`），改路徑別名時兩邊都要改。測試只收 `src/**/*.test.ts`，環境為 `node`。

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

產品規格以 `product-requirements.md` 為準，原始需求見 `raw/DigitalBizCard_requirement.md`。

## 產品與技術方向（出自需求文件）

- 第一階段（已完成）：用 Next.js 做獨立小網站，只負責把員工電子名片分享給客戶；把 Marp 範例渲染成網頁。
- 第二階段（規劃中）：建立資料表並填入測試資料確認可行。資料庫 SQLite3，暫定資料表 `biz_card`、`staff_headshot`（schema 見需求文件）。規劃定案前不要預先實作。
- 第三階段：員工名片資料維護（MCP server 介面），待第二階段完成再規劃。

## Marp 範例慣例

網站讀取的是 `src/cards/*.marp.md`（甄美麗、艾漂亮、郝聰明、高又壯）；`.docs/raw/電子名片範例_*.marp.md` 只是原始素材，修改它不會影響網站。每份結構相同：

- 首頁（`cover` class）：頭像（`![bg left:38%]`）、姓名、英文名、職稱與專長。
- 內頁以 `---` 分隔：🛠 專業專長、🎓 學歷、💼 經歷、📜 專業證照、💬 LINE 加好友、📇 加入通訊錄。
- 樣式寫在檔頭 front matter 的 `style:`，目前 4 份都使用同一主題色 `#bf4690`。
- QR code 目前以外部服務 `api.qrserver.com` 產圖；LINE 連結與聯絡資料多為佔位的範例值。通訊錄 QR code 用 meCard 格式（`MECARD:N:姓,名;ORG:…;TEL:…;EMAIL:…;;`），內容經 URL encode 後放在 `data=`，電話的 `+` 必須寫成 `%2B`。
- 加入通訊錄頁的版面：`![bg right:35% w:320](…)` 把 QR code 放右側，左側為條列聯絡資料；頁內的 `/vcard/*.vcf` 連結是無效的測試連結，第一階段不實作。
- 名片圖片放在 `public/images/`，Marp 檔以 `/images/…` 絕對路徑引用。封面頭像多使用已合成 LOGO 的 `*_BannerLogo.png`（甄美麗例外，用 `BizCardLogo_text.png`），合成方式見專案 skill `.claude/skills/headshot-logo/`（需 ImageMagick 7 `magick`，僅手動呼叫）。
- 封面右下角 LOGO 用 `![logo](/images/BannerLogo.png)`，靠 front matter 中 `img[alt="logo"]` 的樣式定位。
- 內頁浮水印：front matter 設 `class: watermark`，`section.watermark` 背景為橫式用的 `BannerLogo.png`，並以 CSS 變數 `--watermark-portrait` 指定直式用圖（`BannerLogo_diagonal.png`）；`render.ts` 的直式主題讀取此變數覆寫背景。新增名片時兩者都要設。
