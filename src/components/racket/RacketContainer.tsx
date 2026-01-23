import { rackets } from "../../../public/mock";
import Racket, { IRacket } from "./Racket";
import pageStyles from "../layout/Page.module.css";

type Props = {
  id: string;
};

export default function RacketContainer({ id }: Props) {
  const racket = rackets.find((r) => String(r.id) === String(id)) as IRacket | undefined;

  if (!racket) {
    return (
      <main className={pageStyles.main}>
        <section className={pageStyles.section}>
          <h2 className={pageStyles.sectionTitle}>Ракетка не найдена</h2>
        </section>
      </main>
    );
  }

  return <Racket racket={racket} />;
}

