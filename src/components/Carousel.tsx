"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type Racket = {
  id: number;
  name: string;
  imageUrl: string;
};

export function Carousel({ items }: { items: Racket[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByWidth = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const offset = Math.min(el.clientWidth * 0.8, 600);
    el.scrollBy({ left: dir === "right" ? offset : -offset, behavior: "smooth" });
  };

  return (
    <div className="carousel">
      <button
        className="carousel-button carousel-button--left"
        aria-label="Scroll left"
        onClick={() => scrollByWidth("left")}
      >
        ‹
      </button>

      <div className="carousel-track" ref={trackRef}>
        {items.map((r) => (
          <div key={r.id} className="card carousel-item">
            <Link href={`/rackets/${r.id}`} className="card-link">
              <Image
                src={r.imageUrl}
                alt={r.name}
                width={420}
                height={420}
                className="card-image"
              />
            </Link>
            <div className="card-title">{r.name}</div>
          </div>
        ))}
      </div>

      <button
        className="carousel-button carousel-button--right"
        aria-label="Scroll right"
        onClick={() => scrollByWidth("right")}
      >
        ›
      </button>
    </div>
  );
}

