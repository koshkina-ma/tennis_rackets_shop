import Link from "next/link";
import { Carousel } from "@/components/carousel/carousel";
import pageStyles from "@/components/layout/page.module.css";
import { getRackets } from "@/services/get-rackets";
import { getTop10 } from "@/services/get-top10";
import homeStyles from "./page.module.css";

export default async function Page() {
  const [racketsData, top10Data] = await Promise.all([
    getRackets(),
    getTop10(),
  ]);

  const rackets = racketsData.isError ? [] : (racketsData.data ?? []).slice(0, 10);
  const top10 = top10Data.isError ? [] : (top10Data.data ?? []);

  return (
    <main className={pageStyles.main}>
      <section className={pageStyles.section}>
        <div className={homeStyles.sectionHeader}>
          <h2 className={pageStyles.sectionTitle}>Ракетки</h2>
          <div>
            <Link href="/rackets" className={homeStyles.allLink}>
              Все ↗
            </Link>
          </div>
        </div>

        <Carousel items={rackets} />
      </section>

      <section className={pageStyles.section}>
        <div className={homeStyles.sectionHeader}>
          <h2 className={pageStyles.sectionTitle}>Топ-10</h2>
          <div>
            <Link href="/rackets/top-10" className={homeStyles.allLink}>
              Все ↗
            </Link>
          </div>
        </div>

        <Carousel items={top10} />
      </section>
    </main>
  );
}