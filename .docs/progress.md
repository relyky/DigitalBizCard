# 進度

最後更新：2026-10-31

## 目前狀態

第一階段完成，確認可行（Next.js 16.4.3、marp-core 4.4.0、Vitest 8 個測試通過、`npm run build` 通過）。下一步：規劃第二階段。

## 文件

| 文件 | 狀態 |
|---|---|
| `raw/DigitalBizCard_requirement.md`（原始需求） | 完成 |
| `product-requirements.md` | 完成 |
| `tech-stack.md` | 完成 |
| `implementation-plan.md` | 完成 |

## 第一階段施工

步驟定義見 `implementation-plan.md`。步驟 2、3 的邏輯採 TDD（Vitest）；步驟 4、5 手動驗證。

- [x] 1. 建立 Next.js 專案（含 Vitest）
- [x] 2. 放入 Marp 來源檔與 uuid 對照表（TDD）
- [x] 3. 建立 `/bizcard/<uuid>` 頁面（TDD）
- [x] 4. 驗證渲染結果
- [x] 5. 驗證 QR code
- [x] 6. 收尾

### 驗證紀錄（2026-10-31）

- **網址**：4 個網址都回 200，各 7 頁；不存在的 uuid 回 404。
- **版面（截圖目視）**：
  - 4 份名片的封面、內頁、LINE 頁、通訊錄頁都正確。
  - `bg left:38%` 的頭像在左側，`bg right:35% w:320` 的 QR code 在右側。
  - `cover` class、檔頭 `style:` 的主題色與色條、頁碼、emoji 都正確。
  - marp-core 與 marp.live 使用同一套渲染引擎，所以沒有逐頁並排比對。
- **手機寬度**：在 375px 寬的 iframe 中，投影片等比縮小；`scrollWidth` 等於 `clientWidth`，不會橫向捲動。
- **QR code**：
  - 8 張圖片都正常顯示。
  - 用 jsQR 解碼，內容與來源資料完全一致，包括中文與 `+886`。
  - 實機掃描後，vCard 可以匯入通訊錄（使用者確認）。
- **CSS 隔離**：Marp 的 CSS 只作用在 `.marpit` 範圍內，沒有用到 iframe 隔離。範本附的全域重設 CSS 已移除，以免影響 Marp 樣式。
- **其他**：4 份範例的主題色都是 `#bf4690`，來源檔本來就是如此。

## 第一階段結論

成功標準出自 `product-requirements.md`。

- [x] 4 份範例都能以各自網址正確顯示，版面與 Marp 預覽一致
- [x] 兩種 QR code 都能顯示且可掃描（vCard 可匯入；LINE 掃描內容正確）
- [x] 手機寬度下投影片等比縮放，不橫向溢出
- [x] 網址中的 uuid 不存在時回應 404

是否確認可行：**可行**。用 marp-core 在伺服器端渲染 Marp 名片，可以符合第一階段全部成功標準。

## 手機直式版（2026-10-31，PR #2）

手機寬度下 1280×720 投影片縮放約 0.29 倍、字體過小，改為窄螢幕（≤ 600px）顯示 720×1280 直式版：封面照片在上方、通訊錄 QR code 在標題下方、LINE 頁 QR code 放大置中。另外「點我…」連結加底線，並移除 LINE 頁的「掃描 QR Code 加入 LINE 好友」說明。已在 Chrome 檢查；尚未在實機（iOS Safari / Android Chrome）確認。

## 待解決問題

無。
