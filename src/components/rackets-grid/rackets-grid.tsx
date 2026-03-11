import Card from "@/components/card/card";
import pageStyles from "@/components/layout/page.module.css";
import type { RacketType } from "@/types/racket";
import type { FC } from "react";
import styles from "./rackets-grid.module.css";

type Props = {
  rackets: RacketType[];
  title?: string;
};

const RacketsGrid: FC<Props> = ({ rackets, title }) => {
  return (
    <>
      {title != null && (
        <h2 className={pageStyles.sectionTitle}>{title}</h2>
      )}
      <div className={styles.grid}>
        {rackets.map((r) => (
          <Card key={r.id} id={r.id} name={r.name} imageUrl={r.imageUrl} />
        ))}
      </div>
    </>
  );
};

export default RacketsGrid;
