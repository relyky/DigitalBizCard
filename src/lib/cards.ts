import fs from "node:fs";
import path from "node:path";

// 第一階段暫定：uuid 寫死對應 src/cards/ 下的 Marp 檔
const CARD_FILES = new Map<string, string>([
  ["a1123456789012345678901234567890", "郝聰明.marp.md"],
  ["b2123456789012345678901234567890", "甄美麗.marp.md"],
  ["c3123456789012345678901234567890", "艾漂亮.marp.md"],
  ["d4123456789012345678901234567890", "高又壯.marp.md"],
]);

const CARDS_DIR = path.join(process.cwd(), "src", "cards");

export function findCardMarkdown(uuid: string): string | null {
  const file = CARD_FILES.get(uuid);
  if (!file) return null;
  return fs.readFileSync(path.join(CARDS_DIR, file), "utf8");
}
