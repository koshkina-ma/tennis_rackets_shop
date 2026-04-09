import Card from "@/components/card/card";
import pageStyles from "@/components/layout/page.module.css";
import type { RacketType } from "@/types/racket";
import type { FC } from "react";
import styles from "./rackets-grid.module.css";

type Props = {
  rackets: RacketType[];
  title?: string;
  showFavorite?: boolean;
};

const RacketsGrid: FC<Props> = ({ rackets, title, showFavorite = true }) => {
  return (
    <>
      {title != null && (
        <h2 className={pageStyles.sectionTitle}>{title}</h2>
      )}
      <div className={styles.grid}>
        {rackets.map((r) => (
          <Card key={r.id} racket={r} showFavorite={showFavorite} />
        ))}
      </div>
    </>
  );
};

export default RacketsGrid;
