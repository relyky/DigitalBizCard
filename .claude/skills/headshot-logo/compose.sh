#!/usr/bin/env bash
# 把 LOGO 合成到大頭照背景上，LOGO 藏在人物（深色頭髮）後面。
# 用法：compose.sh <主圖> <LOGO> [--width 540] [--x 90] [--y 10] [--shift 0] [--level 20%,30%]
# 輸出：<主圖目錄>/<主圖檔名>_<LOGO檔名>.png（尺寸與主圖相同），並印出預覽裁切圖路徑。
set -euo pipefail

main=${1:?缺少主圖}; logo=${2:?缺少 LOGO}; shift 2
width=540; x=90; y=10; down=0; level="20%,30%"
while [ $# -gt 0 ]; do
  case "$1" in
    --width) width=$2 ;; --x) x=$2 ;; --y) y=$2 ;;
    --shift) down=$2 ;; --level) level=$2 ;;
    *) echo "未知參數：$1" >&2; exit 2 ;;
  esac
  shift 2
done

W=$(magick identify -format %w "$main"); H=$(magick identify -format %h "$main")
stem=$(basename "${main%.*}"); lstem=$(basename "${logo%.*}")
out="$(dirname "$main")/${stem}_${lstem}.png"
tmp=$(mktemp -d)

# 1. 人物下移：用主圖最上面一列背景往下延伸補滿，再裁回原尺寸（底部被切掉 down px）
if [ "$down" -gt 0 ]; then
  magick \( "$main" -crop "${W}x1+0+0" +repage -scale "${W}x${down}!" \) "$main" \
    -append -crop "${W}x${H}+0+0" +repage "$tmp/base.png"
else
  magick "$main" "$tmp/base.png"
fi

# 2. 背景遮罩：亮（背景）= 白、暗（頭髮）= 黑；Open 去掉捲髮縫隙裡的小白點
magick "$tmp/base.png" -colorspace gray -level "$level" -morphology Open Disk:6 -blur 0x1 "$tmp/mask.png"

# 3. LOGO 放到全尺寸透明圖層，alpha 乘上遮罩，再疊到底圖
magick -size "${W}x${H}" xc:none \( "$logo" -resize "${width}x" \) -geometry "+${x}+${y}" -composite "$tmp/layer.png"
magick "$tmp/layer.png" \( +clone -alpha extract "$tmp/mask.png" -compose multiply -composite \) \
  -alpha off -compose CopyOpacity -composite "$tmp/layer_masked.png"
magick "$tmp/base.png" "$tmp/layer_masked.png" -compose over -composite "$out"

# 4. 預覽：LOGO 附近的局部放大圖
magick "$out" -crop "$((x + width + 150))x$((y + width / 2))+0+0" +repage "$tmp/preview.png"

echo "輸出：$out"
echo "預覽：$(cygpath -m "$tmp/preview.png" 2>/dev/null || echo "$tmp/preview.png")"
