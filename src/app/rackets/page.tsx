import { Filters } from "@/components/filters/filters";
import RacketsGrid from "@/components/rackets-grid/rackets-grid";
import pageStyles from "@/components/layout/page.module.css";
import { getRackets } from "@/services/get-rackets";
import styles from "./rackets.module.css";

export default async function RacketsPage() {
  const { isError, data } = await getRackets();

  if (isError) {
    return (
      <main className={pageStyles.main}>
        <section className={pageStyles.section}>
          <p>Упс, сервер ракеток прилег отдохнуть...</p>
        </section>
      </main>
    );
  }

  return (
    <main className={pageStyles.main}>
      <section className={pageStyles.section}>
        <div className={styles.racketsLayout}>
          <aside className={styles.sidebar} aria-label="Фильтры">
            <Filters />
          </aside>

          <div className={styles.racketsList}>
            <RacketsGrid rackets={data} title="Ракетки" />
          </div>
        </div>
      </section>
    </main>
  );
}