import { Marp } from "@marp-team/marp-core";
import { findCardMarkdown } from "./cards";

export function renderCard(uuid: string): { html: string; css: string } | null {
  const markdown = findCardMarkdown(uuid);
  if (markdown === null) return null;
  const { html, css } = new Marp().render(markdown);
  return { html, css };
}
