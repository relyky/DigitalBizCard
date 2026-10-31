
# 電子名片網站

## Rolemap

### 第一階段
1. 用 next.js 開發獨立小網站，只用來分享員工的電子名片給客戶。
2. 使用 marp 範例渲染成網頁。
3. 確認可行再規劃下一階段。

### 第二階段
- 目標: 員工電子名片資料維護。
(待**第一階段**完成再規劃)

## 暫定資料表
註： **第一階段**還不需要。

-- 電子名片 
CREATE TABLE biz_card (
    id TEXT PRIMARY KEY,                       -- 儲存 UUID
    staff_id TEXT NOT NULL,                    -- 公司員工 ID
    is_active INTEGER NOT NULL DEFAULT 1,      -- 狀態：1 啟用, 0 停用
    headshot_url TEXT,                         -- 圖片以 URL 取得
    marp_cnt TEXT,                             -- marp 內容
    vcard_cnt TEXT,                            -- 聯絡資訊內容
    line_me TEXT,                              -- 加入 line 好友
    upd_at TEXT DEFAULT CURRENT_TIMESTAMP      -- 最後更新時間
);

-- 大頭照
CREATE TABLE staff_headshot (
    id TEXT PRIMARY KEY,                       -- 員工 ID 或圖片 ID
    img_blob BLOB,                             -- 圖片 binary
    img_type TEXT,                             -- 圖片格式 (例如 image/png)
    upd_at TEXT DEFAULT CURRENT_TIMESTAMP      -- 最後更新時間
);


## 技術棧

framework: Next.js
database: SQLite3

暫定部署方式: [在IIS上部署Nextjs應用程式](https://www.csie.ntu.edu.tw/~r08922a25/blog/2026/10/12/%E5%9C%A8IIS%E4%B8%8A%E9%83%A8%E7%BD%B2Nextjs%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F/)

## 預計成果
輸入網址瀏覽
http://localhost:3000/bizcard/<staff-shared-uuid>


## 方法
### marp 套件

### qrcode rendering 套件
渲染 line_me qrcode 與 vcard qrcode。

## todo
[x] 準備4份 marp 範本測試: 郝聰明、甄美麗、艾漂亮、高又壯
