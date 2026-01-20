import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { rackets } from "../../public/mock";

type Racket = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  model?: string;
  brand?: { name: string };
};

const Page: FC = () => {
  const topThree: Racket[] = rackets.slice(0, 3);

  return (
    <main className="main">
      <section className="section">
        <h2 className="section-title">Ракетки</h2>

        <div className="grid">
          {topThree.map((r) => (
            <article key={r.id} className="card">
              <Link href={`/rackets/${r.id}`} className="card-link">
                <Image
                  src={r.imageUrl}
                  alt={r.name}
                  width={500}
                  height={360}
                  className="card-image"
                />
              </Link>
              <div className="card-title">{r.name}</div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;