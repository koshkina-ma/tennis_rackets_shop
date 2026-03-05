import pageStyles from "@/components/layout/page.module.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className={pageStyles.main}>
      <section className={pageStyles.section}>
        <p>Страница не найдена.</p>
        <p>
          <Link href="/">На главную</Link>
        </p>
      </section>
    </main>
  );
}
