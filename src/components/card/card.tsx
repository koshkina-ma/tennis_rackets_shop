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
      {isFavoriteGlobal && (
        <div className={styles.favoriteBadge} role="img" aria-label="В избранном">
          <svg
            className={styles.favoriteBadgeIcon}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6 2h12a2 2 0 0 1 2 2v18l-8-5-8 5V4a2 2 0 0 1 2-2z" />
          </svg>
        </div>
      )}
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

