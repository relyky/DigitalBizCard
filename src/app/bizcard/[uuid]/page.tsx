import { notFound } from "next/navigation";
import { renderCard } from "@/lib/render";
import styles from "./page.module.css";

export default async function BizCardPage({
  params,
}: PageProps<"/bizcard/[uuid]">) {
  const { uuid } = await params;
  const card = renderCard(uuid);
  if (!card) notFound();

  // 橫式與直式各輸出一份，由 page.module.css 的 media query 決定顯示哪一份
  return (
    <main className={styles.slides}>
      <style dangerouslySetInnerHTML={{ __html: card.landscape.css }} />
      <style dangerouslySetInnerHTML={{ __html: card.portrait.css }} />
      <div dangerouslySetInnerHTML={{ __html: card.landscape.html }} />
      <div dangerouslySetInnerHTML={{ __html: card.portrait.html }} />
    </main>
  );
}
