"use client";

import type { FC } from "react";
import Image from "next/image";
import { ToggleFavoriteButton } from "@/components/favorite-button/favorite-button";
import { useHydrateFavorite, useIsFavoriteById } from "@/app/providers/favorite/hooks";
import { UserContext } from "@/app/providers/user";
import styles from "./racket.module.css";
import type { RacketType } from "../../types/racket";
import { use } from "react";

type Props = {
  racket: RacketType;
};

export const RacketDetails: FC<Props> = ({ racket }) => {
  const { name, imageUrl, description, brand, price, model } = racket;
  const { user } = use(UserContext);

  const isFavoriteInitial = Boolean(racket.userData?.isFavorite);

  useHydrateFavorite({
    racketId: racket.id,
    isFavorite: isFavoriteInitial,
  });

  const isFavoriteGlobal = useIsFavoriteById({
    id: racket.id,
    isFavoriteInitial,
  });

  return (
    <section className={styles.root}>
      <div className={styles.info}>
        <div className={styles.brand}>{brand?.name}</div>
        <div className={styles.name}>
          {name}
          {user !== undefined && isFavoriteGlobal && (
            <span className={styles.favoriteInline} role="img" aria-label="В избранном">
              <svg
                className={styles.favoriteInlineIcon}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6 2h12a2 2 0 0 1 2 2v18l-8-5-8 5V4a2 2 0 0 1 2-2z" />
              </svg>
            </span>
          )}
        </div>
        <ToggleFavoriteButton 
        isFavorite={isFavoriteGlobal} 
        productId={racket.id}
        />
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

