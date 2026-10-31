import { describe, expect, it } from "vitest";
import { renderCard } from "./render";

describe("renderCard", () => {
  it("不存在的 uuid 回傳 null（頁面據此回 404）", () => {
    expect(renderCard("00000000000000000000000000000000")).toBeNull();
  });

  it("存在的 uuid 產生投影片 HTML 與 CSS", () => {
    const result = renderCard("a1123456789012345678901234567890");
    expect(result).not.toBeNull();
    const { html, css } = result!.landscape;
    // 郝聰明範例共 7 頁
    // 每頁投影片包在一個 <svg data-marpit-svg>（背景圖會另外產生 section，不能數 section）
    expect(html.match(/<svg data-marpit-svg/g)).toHaveLength(7);
    expect(html).toContain("郝聰明");
    expect(html).toContain('class="cover"');
    expect(html).toContain("api.qrserver.com");
    // 檔頭 style: 的主題色有進入 CSS
    expect(css).toContain("#bf4690");
  });

  it("另產生 720x1280 直式版，容器 class 與橫式不同", () => {
    const { landscape, portrait } = renderCard("a1123456789012345678901234567890")!;
    expect(landscape.html).toContain('viewBox="0 0 1280 720"');
    expect(portrait.html).toContain('<div class="marpit-portrait">');
    expect(portrait.html.match(/<svg data-marpit-svg/g)).toHaveLength(7);
    expect(portrait.html).toContain('viewBox="0 0 720 1280"');
    expect(portrait.css).toContain("div.marpit-portrait");
    // 通訊錄頁的 bg right 分割背景只在直式版改成一般圖片
    expect(landscape.html).toContain('data-marpit-advanced-background-split="right"');
    expect(portrait.html).not.toContain('data-marpit-advanced-background-split="right"');
  });
});
