import { Suspense } from "react";
import { SectionSkeleton } from "@/components/section-skeleton/section-skeleton";
import pageStyles from "@/components/layout/page.module.css";
import { RacketsSection } from "./rackets-section";
import { Top10Section } from "./top10-section";

export default function Page() {
  return (
    <main className={pageStyles.main}>
      <Suspense fallback={<SectionSkeleton />}>
        <RacketsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Top10Section />
      </Suspense>
    </main>
  );
}
