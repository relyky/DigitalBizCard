import { notFound } from "next/navigation";
import { renderCard } from "@/lib/render";
import styles from "./page.module.css";

export default async function BizCardPage({
  params,
}: PageProps<"/bizcard/[uuid]">) {
  const { uuid } = await params;
  const card = renderCard(uuid);
  if (!card) notFound();

  return (
    <main className={styles.slides}>
      <style dangerouslySetInnerHTML={{ __html: card.css }} />
      <div dangerouslySetInnerHTML={{ __html: card.html }} />
    </main>
  );
}
