import { rackets } from "../../../public/mock";
import RacketDetails from "./racket-details";
import type { RacketType } from "../../types/racket";
import pageStyles from "../layout/page.module.css";

type Props = {
  id: string;
};

export default function RacketContainer({ id }: Props) {
  const racket = rackets.find((r) => String(r.id) === String(id)) as RacketType | undefined;

  if (!racket) {
    return (
      <main className={pageStyles.main}>
        <section className={pageStyles.section}>
          <h2 className={pageStyles.sectionTitle}>Ракетка не найдена</h2>
        </section>
      </main>
    );
  }

  return <RacketDetails racket={racket} />;
}

