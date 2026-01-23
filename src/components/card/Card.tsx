"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Card.module.css";
import type { FC } from "react";

type Props = {
  id: number | string;
  name: string;
  imageUrl: string;
  className?: string;
};

const Card: FC<Props> = ({ id, name, imageUrl, className = "" }) => {
  return (
    <article className={`${styles.card} ${className}`.trim()}>
      <Link href={`/racket/${id}`} className={styles.cardLink}>
        <Image
        src={imageUrl}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={styles.cardImage} />
      </Link>
      <div className={styles.cardTitle}>{name}</div>
    </article>
  );
};

export default Card;

