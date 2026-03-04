import { Filters } from "@/components/filters/filters";
import styles from "./rackets.module.css";
import pageStyles from "@/components/layout/page.module.css";
import Card from "@/components/card/card";
import { getRackets } from "@/services/get-rackets";

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
            <h2 className={pageStyles.sectionTitle}>Ракетки</h2>
            <div className={styles.grid}>
              {data.map((r) => (
                <Card key={r.id} id={r.id} name={r.name} imageUrl={r.imageUrl} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}