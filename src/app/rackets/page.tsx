import Link from "next/link";
import Image from "next/image";
import { Filters } from "../../components/Filters";
import styles from "./rackets.module.css";
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
    <main className="main">
      <section className="section">
        <div className={styles.racketsLayout}>
          <aside className={styles.sidebar} aria-label="Фильтры">
            <Filters />
          </aside>

          <div className={styles.racketsList}>
            <h2 className="section-title">Ракетки</h2>
            <div className="grid">
              {paged.map((r) => (
                <article key={r.id} className="card">
                  <Link href={`/racket/${r.id}`} className="card-link">
                    <Image
                      src={r.imageUrl}
                      alt={r.name}
                      width={500}
                      height={360}
                      className="card-image"
                    />
                  </Link>
                  <div className="card-title">{r.name}</div>
                </article>
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