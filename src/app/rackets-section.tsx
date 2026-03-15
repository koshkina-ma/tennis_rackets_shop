import Link from "next/link";
import { Carousel } from "@/components/carousel/carousel";
import pageStyles from "@/components/layout/page.module.css";
import { getRackets } from "@/services/get-rackets";
import homeStyles from "./page.module.css";

export async function RacketsSection() {
  const racketsData = await getRackets();

  return (
    <section className={pageStyles.section}>
      <div className={homeStyles.sectionHeader}>
        <h2 className={pageStyles.sectionTitle}>Ракетки</h2>
        <div>
          <Link href="/rackets" className={homeStyles.allLink}>
            Все ↗
          </Link>
        </div>
      </div>
      {racketsData.isError ? (
        <p>Не удалось загрузить блок с ракетками.</p>
      ) : (
        <Carousel items={(racketsData.data ?? []).slice(0, 10)} />
      )}
    </section>
  );
}
