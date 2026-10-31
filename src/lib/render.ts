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
section p:has(> img):has(> a) > img { width: 480px !important; }`,
);

export function renderCard(
  uuid: string,
): { landscape: RenderedSlides; portrait: RenderedSlides } | null {
  const markdown = findCardMarkdown(uuid);
  if (markdown === null) return null;
  const pick = ({ html, css }: RenderedSlides) => ({ html, css });
  return {
    landscape: pick(landscapeMarp.render(markdown)),
    // 直式版右側空間太窄：把 `![bg right:35% w:320](…)` 改成一般圖片 `![w:320](…)`，
    // 讓 QR code 排在內容中、文字用整頁寬度
    portrait: pick(portraitMarp.render(markdown.replace(/!\[bg right:\d+%\s*/g, "!["))),
  };
}
