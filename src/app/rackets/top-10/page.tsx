import styles from "./top-10.module.css";
import pageStyles from "@/components/layout/page.module.css";
import Card from "@/components/card/card";
import { getTop10 } from "@/services/get-top10";

export default async function Top10Page() {
  const { isError, data } = await getTop10();

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
        <h2 className={pageStyles.sectionTitle}>Топ-10</h2>
        <div className={styles.grid}>
          {data.map((r) => (
            <Card key={r.id} id={r.id} name={r.name} imageUrl={r.imageUrl} />
          ))}
        </div>
      </section>
    </main>
  );
}
