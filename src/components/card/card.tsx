"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./card.module.css";
import type { FC } from "react";
import { ToggleFavoriteButton } from "../favorite-button/favorite-button";
import { useHydrateFavorite, useIsFavoriteById } from "@/app/providers/favorite/hooks";
import type { RacketType } from "@/types/racket";

type Props = {
  racket: RacketType;
  className?: string;
};

const Card: FC<Props> = ({ racket, className = "" }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { id, name, imageUrl, userData } = racket;

  useHydrateFavorite({
    racketId: id,
    isFavorite: Boolean(userData?.isFavorite),
  });

  const isFavoriteGlobal = useIsFavoriteById({
    id,
    isFavoriteInitial: Boolean(userData?.isFavorite),
  });

  return (
    <div className={`${styles.card} ${className}`.trim()}>
      <Link href={`/racket/${id}`} className={styles.cardLink}>
        <div className={styles.cardMedia}>
          {!isImageLoaded && (
            <div className={styles.cardMediaShimmer} aria-hidden />
          )}
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.cardImage}
            style={{ opacity: isImageLoaded ? 1 : 0 }}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        <div className={styles.cardTitle}>{name}</div>
      </Link>
      <div className={styles.favoriteRow}>
        <ToggleFavoriteButton productId={id} isFavorite={isFavoriteGlobal} />
      </div>
    </div>
  );
};

export default Card;

