import { Filters } from "@/components/filters/filters";
import pageStyles from "@/components/layout/page.module.css";
import styles from "./rackets.module.css";
import { Metadata } from "next";
import { RacketsContainer } from "./rackets-container.client";

export const metadata: Metadata = {
  title: "Rackets | Tennis Rackets Shop",
  description: "Rackets page",
};

export default async function RacketsPage() {
  return (
    <main className={pageStyles.main}>
      <section className={pageStyles.section}>
        <div className={styles.racketsLayout}>
          <aside className={styles.sidebar} aria-label="Фильтры">
            <Filters />
          </aside>

          <div className={styles.racketsList}>
            <RacketsContainer />
          </div>
        </div>
      </section>
    </main>
  );
}