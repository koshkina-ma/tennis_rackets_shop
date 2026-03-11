import pageStyles from "@/components/layout/page.module.css";

export default function NotFound() {
  return (
    <main className={pageStyles.main}>
      <section className={pageStyles.section}>
        <p>Упс, ракетка не найдена...</p>
      </section>
    </main>
  );
}