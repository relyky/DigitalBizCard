---
name: headshot-logo
description: 把公司 LOGO 合成到員工大頭照背景上（LOGO 藏在頭髮後面），輸出 <主圖>_<logo>.png
disable-model-invocation: true
---

# headshot-logo

需要 ImageMagick 7（`magick`）。用 Bash 執行同目錄的 `compose.sh`：

```bash
bash .claude/skills/headshot-logo/compose.sh <主圖> <LOGO> [--width 540] [--x 90] [--y 10] [--shift 0] [--level 20%,30%]
```

| 參數 | 意義 |
|------|------|
| `--width` | LOGO 縮放後寬度（px） |
| `--x` `--y` | LOGO 左上角距主圖左緣、上緣（px） |
| `--shift` | 人物往下移的距離（px）；上方用主圖頂列背景補，底部切掉同樣高度，尺寸不變 |
| `--level` | 遮罩門檻：灰階低於前值算頭髮（擋住 LOGO）、高於後值算背景 |

輸出寫在主圖同目錄，檔名 `<主圖檔名>_<LOGO檔名>.png`，已存在就覆寫。

## 步驟

1. 讀主圖與 LOGO，問使用者沒給的參數；沒指定就用預設值（上一次確認過的效果：郝聰明名片）。
2. 執行 `compose.sh`。
3. 用 Read 看腳本印出的預覽圖與完整輸出圖，檢查兩件事：
   - **LOGO 文字完整露出**：被頭髮擋住就加大 `--shift`（橘紅曲線被擋沒關係）。
   - **頭髮邊緣乾淨**：捲髮縫隙透出 LOGO 顏色，就把 `--level` 兩值調高（例如 `25%,35%`）。
   背景亮度跟範例差很多時，先抽樣背景與頭髮的灰階再決定 `--level`：
   `magick <主圖> -colorspace gray -format "%[fx:p{x,y}]" info:`
4. 兩項都通過才算完成；回報輸出路徑與最終參數。

## 名片上的裁切

橫式封面用 `![bg left:38%]`，照片左右各會被裁掉約 7.8%（1120 寬約 87px）。`--x` 小於約 100 時 LOGO 會貼到封面邊緣；直式版不裁切。
