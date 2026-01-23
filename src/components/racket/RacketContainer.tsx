"use client";

import type { FC } from "react";
import { rackets } from "../../../public/mock";
import Racket, { IRacket } from "./Racket";

type Props = {
  id: string;
};

export const RacketContainer: FC<Props> = ({ id }) => {
  const racket = rackets.find((r) => String(r.id) === String(id)) as IRacket | undefined;

  if (!racket) {
    return (
      <main className="main">
        <section className="section">
          <h2 className="section-title">Ракетка не найдена</h2>
        </section>
      </main>
    );
  }

  return <Racket racket={racket} />;
};

export default RacketContainer;

