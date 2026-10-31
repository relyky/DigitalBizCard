import { describe, expect, it } from "vitest";
import { renderCard } from "./render";

describe("renderCard", () => {
  it("不存在的 uuid 回傳 null（頁面據此回 404）", () => {
    expect(renderCard("00000000000000000000000000000000")).toBeNull();
  });

  it("存在的 uuid 產生投影片 HTML 與 CSS", () => {
    const result = renderCard("a1123456789012345678901234567890");
    expect(result).not.toBeNull();
    const { html, css } = result!;
    // 郝聰明範例共 7 頁
    // 每頁投影片包在一個 <svg data-marpit-svg>（背景圖會另外產生 section，不能數 section）
    expect(html.match(/<svg data-marpit-svg/g)).toHaveLength(7);
    expect(html).toContain("郝聰明");
    expect(html).toContain('class="cover"');
    expect(html).toContain("api.qrserver.com");
    // 檔頭 style: 的主題色有進入 CSS
    expect(css).toContain("#bf4690");
  });
});
