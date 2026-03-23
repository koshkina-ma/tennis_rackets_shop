"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./card.module.css";
import type { FC } from "react";
import { ToggleFavoriteButton } from "../favorite-button/favorite-button";

type Props = {
  id: number | string;
  name: string;
  imageUrl: string;
  isFavorite?: boolean;
  className?: string;
};

const Card: FC<Props> = ({
  id,
  name,
  imageUrl,
  isFavorite,
  className = "",
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

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
        <ToggleFavoriteButton isFavorite={isFavorite} />
      </div>
    </div>
  );
};

export default Card;

