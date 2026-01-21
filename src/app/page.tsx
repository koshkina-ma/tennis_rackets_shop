import { FC } from "react";
import Link from "next/link";
import { rackets } from "../../public/mock";
import { Carousel } from "../components/Carousel";

type Racket = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  model?: string;
  brand?: { name: string };
};

const Page: FC = () => {
  return (
    <main className="main">
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Ракетки</h2>
          <div>
            <Link href="/rackets" className="all-link">
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