import Image from "next/image";
import { rackets } from "../../../../public/mock";

type PageProps = {
  params: Promise<{ id: string }> | { id: string };
};

// Pre-generate pages for first 3 rackets from mock
export async function generateStaticParams() {
  const ids = rackets.slice(0, 3).map((r) => ({ id: String(r.id) }));
  return ids;
}

export default async function RacketPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  console.log("RacketPage request params:", { paramsId: resolvedParams.id, parsedId: id });
  console.log("Available racket ids:", rackets.map((r) => r.id).slice(0, 50));
  const racket = rackets.find((r) => r.id === id);

  if (!racket) {
    return (
      <main className="main">
        <section className="section">
          <h2 className="section-title">Ракетка не найдена</h2>
        </section>
      </main>
    );
  }

  return (
    <main className="main">
      <section className="section racket-detail">
        <div className="racket-detail-inner">
          <div className="racket-image-wrapper">
            <Image
              src={racket.imageUrl}
              alt={racket.name}
              width={600}
              height={720}
              className="racket-main-image"
            />
          </div>
          <div className="racket-info">
            <h1 className="racket-title">{racket.name}</h1>

            <p className="racket-price">${racket.price}</p>

            <p className="racket-brand">{racket.brand?.name}</p>

            <p className="racket-description">{racket.description}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

