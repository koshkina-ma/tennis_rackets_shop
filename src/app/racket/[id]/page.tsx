import RacketContainer from "@/components/racket/racket-container";
import pageStyles from "@/components/layout/page.module.css";
import { getRacketById } from "@/services/get-racket-by-id";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }> | { id: string };
};

export default async function RacketPage({ params }: PageProps) {
  const resolvedParams = await params;

  const { isError, data } = await getRacketById({ id: resolvedParams.id });

  if (isError) {
    return (
      <main className={pageStyles.main}>
        <section className={pageStyles.section}>
          <p>Упс, сервер ракеток прилег отдохнуть...</p>
        </section>
      </main>
    );
  }

  if (!data) {
    notFound();
  }

  return (
    <main className={pageStyles.main}>
      <section className={pageStyles.section}>
        <RacketContainer racket={data} />
      </section>
    </main>
  );
}

