import pageStyles from "@/components/layout/page.module.css";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found | Tennis Rackets Shop",
  description: "Not found page",
};  //TODO эта метадата не работает

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
