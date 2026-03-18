import RacketContainer from "@/components/racket/racket-container";
import pageStyles from "@/components/layout/page.module.css";
import { getRacketById } from "@/services/get-racket-by-id";
import { getRacketMetadata } from "@/services/get-racket-metadata";
import { notFound } from "next/navigation";
import { Suspense } from "react";


type PageProps = {
  params: Promise<{ id: string }> | { id: string };
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { id } = await params;
  const { data } = await getRacketMetadata({ id });
  const name = data?.name ?? id;
  const description = data?.description ?? `Страница ракетки: ${id}`;
  return {
    title: `${name} | Tennis Rackets Shop`,
    description,
  };
};  

export default async function RacketPage({ params }: PageProps) {
  const resolvedParams = await params;

  const { isError, data } = await getRacketById({ id: resolvedParams.id });

  if (isError) {
    throw new Error("Ошибка загрузки ракетки");
  }

  if (!data) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <main className={pageStyles.main}>
      <section className={pageStyles.section}>
        <RacketContainer racket={data} />
        </section>
      </main>
    </Suspense>
  );
}

