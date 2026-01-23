import { FC } from "react";
import Link from "next/link";
import { rackets } from "../../public/mock";
import { Carousel } from "../components/carousel/carousel";
import pageStyles from "../components/layout/page.module.css";
import homeStyles from "./page.module.css";

const Page: FC = () => {
  return (
    <main className={pageStyles.main}>
      <section className={pageStyles.section}>
        <div className={homeStyles.sectionHeader}>
          <h2 className={pageStyles.sectionTitle}>Ракетки</h2>
          <div>
            <Link href="/rackets" className={homeStyles.allLink}>
              Все ↗
            </Link>
          </div>
        </div>

        <Carousel items={rackets} />
      </section>
    </main>
  );
};

export default Page;