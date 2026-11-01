
# 電子名片網站

## Rolemap

### 第一階段
1. 用 next.js 開發獨立小網站，只用來分享員工的電子名片給客戶。
2. 使用 marp 範例渲染成網頁。
3. 確認可行再規劃下一階段。

### 第二階段
- 目標: 建立資料表。並把測試資料填入確認可行。
(規劃中)

### 第三階段
- 目標: 員工電子名片資料維護。
- 建立 MCP server 介面進行資料維護。
(待**第二階段**完成再規劃)

## 暫定資料表

註： **第一階段**還不需要。

-- 電子名片 
CREATE TABLE biz_card (
    id TEXT PRIMARY KEY,                       -- UUID: 32位 hex 文字。
    staff_id TEXT NOT NULL,                    -- 公司員工 ID: 應該是 unique。
    is_active INTEGER NOT NULL DEFAULT 1,      -- 狀態：1 啟用, 0 停用。
    marp_body TEXT,                             -- marp 內容。
    line_me TEXT,                              -- 加入 line 好友的 URL。
    upd_at TEXT DEFAULT CURRENT_TIMESTAMP      -- 最後更新時間。
);

-- 大頭照
CREATE TABLE staff_headshot (
    id TEXT PRIMARY KEY,                       -- 公司員工 ID 或圖片 ID。
    img BLOB,                                  -- 圖片 binary。
    mime_type TEXT,                            -- 圖片 MIME 類別 (例如 image/png)。
    upd_at TEXT DEFAULT CURRENT_TIMESTAMP      -- 最後更新時間。
);

-- 通訊錄聯絡資料
CREATE TABLE staff_contact (
    id TEXT PRIMARY KEY,                       -- 公司員工 ID 或圖片 ID。
    contact_info TEXT,                                 -- 公司員工聯絡資料，以 JSON 儲存。
    qrcode_img BLOB,                           -- QR Code 圖片 binary。
    qrcode_mime TEXT,                          -- QR Code 圖片 MIME 類別 (例如 image/png)。  
		vcard_vcf BLOB,                            -- vCard 檔案 binary。
		vcard_mime TEXT,                           -- vCard 檔案 MIME 類別 (例如 text/plain)。
    upd_at TEXT DEFAULT CURRENT_TIMESTAMP      -- 最後更新時間。
);

## 通訊錄交換聯絡資料

用 JSON 格式存入 6 個欄位。以例子說明。

### 儲存資料 JSON

資料表以 JSON 存入。
均以 UTF8 進行編碼。

```json
{
	"surname": "郝",
	"givenName": "聰明", 
	"org" : "範例科技公司",
	"cellTel": "0900-123-456",
	"workTel": "02-2222-1234,919",
	"email": "tsungming.hao@example.com"
}
```

### 檔案交換用 vCard 檔(*.vcf)

```vCard
BEGIN:VCARD
VERSION:3.0
N;CHARSET=UTF-8:郝;聰明;;;
FN;CHARSET=UTF-8:郝聰明
ORG;CHARSET=UTF-8:範例科技公司
TEL;TYPE=CELL:0900-123-456
TEL;TYPE=WORK:02-2222-1234,919
EMAIL:tsungming.hao@example.com
END:VCARD
```

### 掃描 QR Code 交換用 MeCard 格式

```meCard
MECARD:N:郝聰明;ORG:範例科技公司;TEL:+886912345101;TEL:+886200000101;EMAIL:tsungming.hao@example.com;;
```

## 技術棧

framework: Next.js
database: SQLite3

暫定部署方式: [在IIS上部署Nextjs應用程式](https://www.csie.ntu.edu.tw/~r08922a25/blog/2026/10/12/%E5%9C%A8IIS%E4%B8%8A%E9%83%A8%E7%BD%B2Nextjs%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F/)

## 預計成果
輸入網址瀏覽
http://localhost:3000/bizcard/<staff-shared-uuid>


## 方法
### marp 套件
選用: "@marp-team/marp-core"

### qrcode rendering 套件
渲染 line_me qrcode 與 vcard qrcode。

## todo
[x] 準備4份 marp 範本測試: 郝聰明、甄美麗、艾漂亮、高又壯
