import RacketContainer from "../../../components/racket/racket-container";
import pageStyles from "../../../components/layout/page.module.css";

type PageProps = {
  params: Promise<{ id: string }> | { id: string };
};

export default async function RacketPage({ params }: PageProps) {
  const resolvedParams = await params;

  return (
    <main className={pageStyles.main}>
      <section className={pageStyles.section}>
        <RacketContainer id={resolvedParams.id} />
      </section>
    </main>
  );
}

