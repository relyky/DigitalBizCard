import { describe, expect, it } from "vitest";
import { findCardMarkdown } from "./cards";

describe("findCardMarkdown", () => {
  it.each([
    ["a1123456789012345678901234567890", "郝聰明"],
    ["b2123456789012345678901234567890", "甄美麗"],
    ["c3123456789012345678901234567890", "艾漂亮"],
    ["d4123456789012345678901234567890", "高又壯"],
  ])("uuid %s 對應 %s 的 Marp 檔", (uuid, name) => {
    const md = findCardMarkdown(uuid);
    expect(md).not.toBeNull();
    expect(md).toContain("marp: true");
    expect(md).toContain(`# ${name}`);
  });

  it("不存在的 uuid 回傳 null", () => {
    expect(findCardMarkdown("00000000000000000000000000000000")).toBeNull();
  });

  it("不可利用原型屬性名稱", () => {
    expect(findCardMarkdown("constructor")).toBeNull();
  });
});
