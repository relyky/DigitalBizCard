import { Marp } from "@marp-team/marp-core";
import { Element } from "@marp-team/marpit";
import { findCardMarkdown } from "./cards";

export type RenderedSlides = { html: string; css: string };

const landscapeMarp = new Marp();

// 手機用的直式版：覆寫 default 主題的尺寸為 720x1280，
// 並換掉容器 class，避免兩份 CSS（都以容器 class 為範圍）互相干擾。
const portraitMarp = new Marp({
  container: new Element("div", { class: "marpit-portrait" }),
});
portraitMarp.themeSet.add(
  `${landscapeMarp.themeSet.get("default")!.css}
section { width: 720px; height: 1280px; }
/* 圖片與文字並排的段落（如 LINE 頁的 QR code + 連結）改上下排列，避免圖片被壓縮 */
section p:has(> img) { flex-direction: column; }
/* LINE 頁（QR code + 連結）：水平置中、放大 QR code 填滿版面 */
section p:has(> img):has(> a) { gap: 48px; margin-top: 80px; }
section p:has(> img):has(> a) > img { width: 480px !important; }
/* 封面：照片改為頂部滿版（抵銷 section 的 padding），文字排在下方。
   名片 front matter 的 section.cover 設了 align-content:center，且排在主題之後，需 !important 覆寫 */
section.cover { align-content: start !important; padding-top: 0; }
section.cover p:has(> img) { margin: 0 -80px 48px -60px; }
section.cover p:has(> img) > img { width: 100%; height: 640px; object-fit: cover; object-position: top; }
/* 浮水印（名片設 class: watermark）：直式版面高長，改用名片指定的斜放圖並放大 */
section.watermark { background-image: linear-gradient(rgba(255,255,255,.9), rgba(255,255,255,.9)), var(--watermark-portrait) !important; background-size: auto, 95% auto !important; }`,
);

export function renderCard(
  uuid: string,
): { landscape: RenderedSlides; portrait: RenderedSlides } | null {
  const markdown = findCardMarkdown(uuid);
  if (markdown === null) return null;
  const pick = ({ html, css }: RenderedSlides) => ({ html, css });
  return {
    landscape: pick(landscapeMarp.render(markdown)),
    // 直式版左右分割太窄：把 `![bg left:38%](…)`、`![bg right:35% w:320](…)` 改成一般圖片，
    // 封面照片排到上方、QR code 排在內容中，文字用整頁寬度
    portrait: pick(
      portraitMarp.render(markdown.replace(/!\[bg (?:left|right):\d+%\s*/g, "![")),
    ),
  };
}
