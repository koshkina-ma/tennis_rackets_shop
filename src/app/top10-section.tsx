import Link from "next/link";
import { Carousel } from "@/components/carousel/carousel";
import pageStyles from "@/components/layout/page.module.css";
import { getTop10 } from "@/services/get-top10";
import homeStyles from "./page.module.css";

export async function Top10Section() {
  const top10Data = await getTop10();
  const top10 = top10Data.isError ? [] : (top10Data.data ?? []);

  return (
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
  );
}
