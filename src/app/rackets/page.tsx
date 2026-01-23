import Link from "next/link";
import { Filters } from "../../components/filters/Filters";
import styles from "./rackets.module.css";
import pageStyles from "../../components/layout/Page.module.css";
import Card from "../../components/card/Card";
import { rackets } from "../../../public/mock";

type SearchParams = { page?: string | undefined };

export default function RacketsPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const pageSize = 6;
  const page = Math.max(1, Number(searchParams?.page ?? 1));
  const total = rackets.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const paged = rackets.slice(start, start + pageSize);

  const makePageLink = (p: number) => (p === 1 ? "/rackets" : `/rackets?page=${p}`);

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
              {paged.map((r) => (
                <Card key={r.id} id={r.id} name={r.name} imageUrl={r.imageUrl} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className={styles.pagination} aria-label="Pagination">
                <ul className={styles.paginationList}>
                  <li className={styles.pageItem}>
                    <Link
                      href={makePageLink(Math.max(1, page - 1))}
                      className={`${styles.pageLink} ${page === 1 ? styles.pageLinkDisabled : ""}`}
                      aria-disabled={page === 1}
                    >
                      ← Prev
                    </Link>
                  </li>

                  {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1;
                    return (
                      <li key={p} className={styles.pageItem}>
                        <Link
                          href={makePageLink(p)}
                          className={`${styles.pageLink} ${p === page ? styles.pageLinkActive : ""}`}
                        >
                          {p}
                        </Link>
                      </li>
                    );
                  })}

                  <li className={styles.pageItem}>
                    <Link
                      href={makePageLink(Math.min(totalPages, page + 1))}
                      className={`${styles.pageLink} ${page === totalPages ? styles.pageLinkDisabled : ""}`}
                      aria-disabled={page === totalPages}
                    >
                      Next →
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}