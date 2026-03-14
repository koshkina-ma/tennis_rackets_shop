import RacketsGrid from "@/components/rackets-grid/rackets-grid";
import pageStyles from "@/components/layout/page.module.css";
import { getTop10 } from "@/services/get-top10";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top-10 | Tennis Rackets Shop",
  description: "Top-10 page",
};

export default async function Top10Page() {
  const { isError, data } = await getTop10();

  if (isError) {
    throw new Error("Ошибка загрузки топ-10");
  }

  return (
    <main className={pageStyles.main}>
      <section className={pageStyles.section}>
        <RacketsGrid rackets={data} title="Топ-10" />
      </section>
    </main>
  );
}
