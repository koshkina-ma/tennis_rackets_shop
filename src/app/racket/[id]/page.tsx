import { rackets } from "../../../../public/mock";
import Racket from "../../../components/racket/Racket";
import pageStyles from "../../../components/layout/Page.module.css";

type PageProps = {
  params: Promise<{ id: string }> | { id: string };
};

// Pre-generate pages for first 3 rackets from mock
export async function generateStaticParams() {
  const ids = rackets.slice(0, 3).map((r) => ({ id: String(r.id) }));
  return ids;
}

export default async function RacketPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  const racket = rackets.find((r) => Number(r.id) === id);

  if (!racket) {
    return (
      <main className={pageStyles.main}>
        <section className={pageStyles.section}>
          <h2 className={pageStyles.sectionTitle}>Ракетка не найдена</h2>
        </section>
      </main>
    );
  }

  return (
    <main className={pageStyles.main}>
      <section className={pageStyles.section}>
        <Racket racket={racket} />
      </section>
    </main>
  );
}

