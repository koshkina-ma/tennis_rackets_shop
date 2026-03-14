"use client";

import pageStyles from "@/components/layout/page.module.css";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className={pageStyles.main}>
      <section className={pageStyles.section}>
        <p>{error.message || "Упс, что-то пошло не так..."}</p>
        <button type="button" onClick={() => reset()}>
          Попробовать снова
        </button>
      </section>
    </main>
  );
}
