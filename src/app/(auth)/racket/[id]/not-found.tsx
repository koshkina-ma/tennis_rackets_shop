import pageStyles from "@/components/layout/page.module.css"; 
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found | Tennis Rackets Shop",
  description: "Racket not found page",
}; 

export default function NotFound() {
  return (
    <main className={pageStyles.main}>
      <section className={pageStyles.section}>
        <p>Упс, ракетка не найдена...</p>
      </section>
    </main>
  );
}