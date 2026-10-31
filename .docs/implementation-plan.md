# 施工計畫（第一階段）

依據 `product-requirements.md` 與 `tech-stack.md`。只涵蓋第一階段；第二階段待第一階段完成後再規劃。標示「（建議）」的是我提出、尚未經你確認的做法。

## 步驟

每一步完成後才進行下一步。

### 1. 建立 Next.js 專案
- 在 repo 根目錄建立 Next.js 專案，程式碼放 `src/`。
- 使用 App Router。
- 完成標準：開發伺服器可啟動，`http://localhost:3000` 可開啟。

### 2. 放入 Marp 來源檔與 uuid 對照表
- 把 4 份範例（郝聰明、甄美麗、艾漂亮、高又壯）從 `.docs/raw/` 複製到 `src/` 下，不直接依賴 `.docs/raw/`。
- 建立寫死的 uuid 對照表，內容見 `product-requirements.md` 的暫定 uuid 對應。
- 完成標準：給定 uuid 能找到對應的 Marp 檔；不存在的 uuid 找不到。

### 3. 建立 `/bizcard/<uuid>` 頁面
- uuid 不存在時回應 404。
- 存在時讀取 Marp 檔，用 `@marp-team/marp-core` 在伺服器端渲染為 HTML 與 CSS。
- 投影片由上到下垂直排列，不做翻頁與導覽。
- 完成標準：4 個網址都能顯示名片；不存在的 uuid 回 404。

### 4. 驗證渲染結果
- 逐一比對 4 份範例與 marp.live 預覽，確認版面一致：封面、`bg left`、`bg right:35% w:320`、檔頭 `style:`、`cover` class。
- 檢查 Marp 的 CSS 是否與頁面樣式互相影響；有影響才處理（例如隔離）。
- 完成標準：4 份範例版面與 marp.live 預覽一致。

### 5. 驗證 QR code
- 確認 LINE 與 vCard 兩種 QR code 都能顯示（`api.qrserver.com`，需連外網）。
- 以手機掃描：vCard 能匯入通訊錄；LINE 因為是假資料，只確認可掃描。
- 完成標準：兩種 QR code 顯示正常，vCard 可匯入。

## 不做

沿用 PRD「不做」清單：資料庫、名片維護、登入、隱私與存取控制、真實資料、有效的 `/vcard/*.vcf` 網址、IIS 部署（第一階段只在本機 localhost 驗證）。

## 待確認

無。
