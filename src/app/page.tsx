import { Suspense } from "react";
import pageStyles from "@/components/layout/page.module.css";
import { RacketsCarouselSection } from "./rackets-carousel-section";
import { Top10CarouselSection } from "./top10-carousel-section";

export default function Page() {
  return (
    <main className={pageStyles.main}>

      <Suspense fallback={null}>
        <RacketsCarouselSection />
      </Suspense>

      <Suspense fallback={null}>
        <Top10CarouselSection />
      </Suspense>
      
    </main>
  );
}
