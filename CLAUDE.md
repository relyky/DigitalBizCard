# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案狀態

DigitalBizCard 是員工電子名片分享網站。**目前尚無程式碼**（沒有 `src/`、`package.json`，因此沒有 build / lint / test 指令），只有 `.docs/` 下的規劃文件與 Marp 範例。建立專案後請把實際指令補進本檔。

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
- 樣式寫在檔頭 front matter 的 `style:`，每人有各自主題色。
- QR code 目前以外部服務 `api.qrserver.com` 產圖；LINE 連結與 vCard 資料多為佔位的範例值。vCard 內容經 URL encode 後放在 `data=`，電話的 `+` 必須寫成 `%2B`。
- 加入通訊錄頁的版面：`![bg right:35% w:320](…)` 把 QR code 放右側，左側為條列聯絡資料；頁內的 `/vcard/*.vcf` 連結是無效的測試連結，第一階段不實作。

## 慣例

- 檔案一律 UTF-8。
- 溝通與文件以繁體中文為主。
