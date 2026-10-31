# 施工計畫（第一階段）

依據 `product-requirements.md` 與 `tech-stack.md`。只涵蓋第一階段；第二階段待第一階段完成後再規劃。

## 開發方式

步驟 2、3 的邏輯採 TDD：先寫失敗的測試，再寫最少的程式讓它通過，最後重構（紅、綠、重構）。測試框架使用 Vitest。步驟 4、5 的版面與 QR code 掃描維持手動驗證，不寫自動化測試。

## 步驟

每一步完成後才進行下一步。

### 1. 建立 Next.js 專案
- 套件管理使用 npm。
- repo 根目錄已有 `README.md`、`CLAUDE.md`、`.docs/`，不可被覆蓋：先在暫存資料夾建立 Next.js 專案，再把內容搬入根目錄，保留既有檔案。
- 程式碼放 `src/`，使用 App Router。
- Node 版本採 Next.js 要求的最低版本以上，實際版本在此步驟確認。
- 安裝 Vitest，並能以 `npm test` 執行測試。
- 完成標準：`npm run dev` 可啟動，`http://localhost:3000` 可開啟；`npm test` 可執行；既有文件未被改動。

### 2. 放入 Marp 來源檔與 uuid 對照表
- 把 4 份範例（郝聰明、甄美麗、艾漂亮、高又壯）從 `.docs/raw/` 複製到 `src/` 下，不直接依賴 `.docs/raw/`。
- 建立寫死的 uuid 對照表，內容見 `product-requirements.md` 的暫定 uuid 對應。
- TDD：先寫測試，涵蓋 4 個 uuid 找得到對應 Marp 檔、不存在的 uuid 找不到。
- 完成標準：給定 uuid 能找到對應的 Marp 檔；不存在的 uuid 找不到；測試全部通過。

### 3. 建立 `/bizcard/<uuid>` 頁面
- TDD：先寫測試，涵蓋 uuid 不存在時走 404、存在時產生投影片 HTML；再實作。
- uuid 不存在時回應 404。
- 存在時讀取 Marp 檔，用 `@marp-team/marp-core` 在伺服器端渲染為 HTML 與 CSS。
- 投影片由上到下垂直排列，不做翻頁與導覽。
- 投影片依螢幕寬度等比縮放，手機上不橫向溢出。
- 完成標準：4 個網址都能顯示名片，手機寬度下不橫向溢出；不存在的 uuid 回 404；測試全部通過。

### 4. 驗證渲染結果
- 以 marp.live 預覽為基準，4 份範例逐頁截圖並排比對。檢查清單：頁數、頭像位置、QR code 位置、主題色、各頁文字、`bg left`、`bg right:35% w:320`、檔頭 `style:`、`cover` class。
- 頭像與 QR code 是外部圖片，需連外網才會顯示。
- 檢查 Marp 的 CSS 是否與頁面樣式互相影響；有影響才處理（例如隔離）。
- 以手機寬度檢查：投影片等比縮放，無橫向捲動。
- 完成標準：4 份範例版面與 marp.live 預覽一致，且手機寬度下不溢出。

### 5. 驗證 QR code
- 確認 LINE 與 vCard 兩種 QR code 都能顯示（`api.qrserver.com`，需連外網）。
- 以手機掃描：vCard 能匯入通訊錄；LINE 為假資料，掃描後內容與範例相同即可，不要求能開啟。
- 完成標準：兩種 QR code 顯示正常，vCard 可匯入，LINE 掃描內容正確。

### 6. 收尾
- 把實際的 `npm` 指令（dev、build、lint、test，含執行單一測試的方式）與 Node 版本補進 `CLAUDE.md`。
- 更新 `progress.md`，記錄第一階段結果與是否確認可行。
- 完成標準：`CLAUDE.md` 指令可照做；`progress.md` 已填寫第一階段結論。

## 不做

沿用 PRD「不做」清單：資料庫、名片維護、登入、隱私與存取控制、真實資料、有效的 `/vcard/*.vcf` 網址、IIS 部署（第一階段只在本機 localhost 驗證）。

## 待確認

無。
