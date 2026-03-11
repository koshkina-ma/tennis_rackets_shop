"use client";

import React, { useRef } from "react";
import styles from "./carousel.module.css";
import cardStyles from "../card/card.module.css";
import Card from "../card/card";
import type { RacketType } from "../../types/racket";

type CarouselItem = Pick<RacketType, "id" | "name" | "imageUrl">;

export function Carousel({ items }: { items: CarouselItem[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByWidth = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const offset = Math.min(el.clientWidth * 0.8, 600);
    el.scrollBy({ left: dir === "right" ? offset : -offset, behavior: "smooth" });
  };

  return (
    <div className={styles.carousel}>
      <button
        className={`${styles.carouselButton} ${styles.carouselButtonLeft}`}
        aria-label="Scroll left"
        onClick={() => scrollByWidth("left")}
      >
        ‹
      </button>

      <div className={styles.carouselTrack} ref={trackRef}>
        {items.map((r) => (
          <div key={r.id} className={styles.carouselItem}>
            <Card id={r.id} name={r.name} imageUrl={r.imageUrl} className={cardStyles.card} />
          </div>
        ))}
      </div>

      <button
        className={`${styles.carouselButton} ${styles.carouselButtonRight}`}
        aria-label="Scroll right"
        onClick={() => scrollByWidth("right")}
      >
        ›
      </button>
    </div>
  );
}

export default Carousel;

