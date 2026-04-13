"use client";

import type { RacketType } from "@/types/racket";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import styles from "./filters.module.css";

type Brand = RacketType["brand"];

const fetcher = async (path: string): Promise<Brand[]> => {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${path}`);
  }

  const json: unknown = await response.json();
  if (!Array.isArray(json)) {
    throw new Error("Unexpected response shape");
  }

  return json as Brand[];
};

const getBrandFromLocation = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = new URLSearchParams(window.location.search).get("brand");
  if (raw == null || raw.trim() === "") {
    return null;
  }

  return raw;
};

export function Filters() {
  const { data, error, isLoading } = useSWR<Brand[]>("/api/brands", fetcher, {
    revalidateIfStale: false,
    shouldRetryOnError: false,
  });

  const brands = useMemo(() => data ?? [], [data]);
  const [activeBrand, setActiveBrand] = useState<string | null>(() =>
    getBrandFromLocation(),
  );

  useEffect(() => {
    const onPopState = () => {
      setActiveBrand(getBrandFromLocation());
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const setBrand = (brand: string | null) => {
    const url = new URL(window.location.href);

    if (brand == null) {
      url.searchParams.delete("brand");
    } else {
      url.searchParams.set("brand", brand);
    }

    url.searchParams.set("page", "1");

    window.history.pushState({}, "", url.toString());
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <div className={styles.filters}>
      <h3 className={styles.filterTitle}>Бренд</h3>
      <ul className={styles.filterList}>
        <li className={styles.filterItem}>
          <button
            type="button"
            className={[
              styles.filterButton,
              activeBrand == null ? styles.filterButtonActive : "",
            ].join(" ")}
            onClick={() => setBrand(null)}
            aria-current={activeBrand == null ? "true" : undefined}
          >
            All
          </button>
        </li>
        {isLoading ? (
          <li className={styles.filterItem}>Загрузка…</li>
        ) : error ? (
          <li className={styles.filterItem}>Не удалось загрузить бренды</li>
        ) : (
          brands.map((b) => (
            <li key={b.id} className={styles.filterItem}>
              <button
                type="button"
                className={[
                  styles.filterButton,
                  b.name === activeBrand ? styles.filterButtonActive : "",
                ].join(" ")}
                onClick={() => setBrand(b.name)}
                aria-current={b.name === activeBrand ? "true" : undefined}
              >
                {b.name}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

