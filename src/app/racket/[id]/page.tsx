import Image from "next/image";
import { rackets } from "../../../../public/mock";
import RacketContainer from "../../../components/racket/RacketContainer";

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
  return (
    <main className="main">
      <section className="section">
        {/* RacketContainer is a client component that picks and renders the racket */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        {/* Render via container */}
        <div>
          {/* Pass id as string to client container */}
          {/* @ts-ignore server -> client prop */}
          <RacketContainer id={String(id)} />
        </div>
      </section>
    </main>
  );
}

