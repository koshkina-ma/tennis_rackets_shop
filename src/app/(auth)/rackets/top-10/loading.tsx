import pageStyles from "@/components/layout/page.module.css";
import { SectionSkeleton } from "@/components/section-skeleton/section-skeleton";

export default function Loading() {
  return (
    <main className={pageStyles.main}>
      <section className={pageStyles.section}>
        <SectionSkeleton />
      </section>
    </main>
  );
}
