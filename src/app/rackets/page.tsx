import Link from "next/link";
import Image from "next/image";
import { Filters } from "../../components/Filters";
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
        <div className="rackets-layout">
          <aside className="sidebar" aria-label="Фильтры">
            <Filters />
          </aside>

          <div className="rackets-list">
            <h2 className="section-title">Ракетки</h2>

            <div className="grid">
              {paged.map((r) => (
                <article key={r.id} className="card">
                  <Link href={`/rackets/${r.id}`} className="card-link">
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
              <nav className="pagination" aria-label="Pagination">
                <ul className="pagination-list">
                  <li className="page-item">
                    <Link
                      href={makePageLink(Math.max(1, page - 1))}
                      className={`page-link ${page === 1 ? "disabled" : ""}`}
                      aria-disabled={page === 1}
                    >
                      ← Prev
                    </Link>
                  </li>

                  {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1;
                    return (
                      <li key={p} className="page-item">
                        <Link
                          href={makePageLink(p)}
                          className={`page-link ${p === page ? "page-link--active" : ""}`}
                        >
                          {p}
                        </Link>
                      </li>
                    );
                  })}

                  <li className="page-item">
                    <Link
                      href={makePageLink(Math.min(totalPages, page + 1))}
                      className={`page-link ${page === totalPages ? "disabled" : ""}`}
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