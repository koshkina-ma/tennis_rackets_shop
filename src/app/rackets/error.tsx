"use client";

import pageStyles from "@/components/layout/page.module.css";

export default function RacketsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className={pageStyles.main}>
      <section className={pageStyles.section}>
        <p>Упс, сервер ракеток прилег отдохнуть...</p>
        <button type="button" onClick={() => reset()}>
          Попробовать снова
        </button>
      </section>
    </main>
  );
}
