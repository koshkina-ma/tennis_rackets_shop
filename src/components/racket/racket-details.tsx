import type { FC } from "react";
import Image from "next/image";
import styles from "./racket.module.css";
import type { RacketType } from "../../types/racket";

type Props = {
  racket: RacketType;
};

export const RacketDetails: FC<Props> = ({ racket }) => {
  const { name, imageUrl, description, brand, price, model } = racket;

  return (
    <section className={styles.root}>
      <div className={styles.info}>
        <div className={styles.brand}>{brand?.name}</div>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>

        <div className={styles.meta}>
          <div>Price: ${price}</div>
          {model && <div>Model: {model}</div>}
        </div>
      </div>
      <Image className={styles.image} src={imageUrl} alt={name} width={800} height={800} />
    </section>
  );
};

export default RacketDetails;

