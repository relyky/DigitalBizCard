
smart  郝聰明
beauty 甄美麗
pretty 艾漂亮
strong 高又壯

======

## 資料表

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


======

## 技術棧

framework: Next.js
database: SQLite3

部署方式: 
[在IIS上部署Nextjs應用程式](https://www.csie.ntu.edu.tw/~r08922a25/blog/2026/10/12/%E5%9C%A8IIS%E4%B8%8A%E9%83%A8%E7%BD%B2Nextjs%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F/)

## 預計成果
http://localhost:3000/bizcard/<staff-shared-uuid>

##

## 方法
marp 套件
qrcode 套件

line_me qrcode 
vcard qrcode


## todo
[ ] 準備4份測試資料
[ ] 把成果給它。


