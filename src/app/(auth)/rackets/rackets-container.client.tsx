"use client";

import { BASE_API_URL } from "@/constants/api";
import RacketsGrid from "@/components/rackets-grid/rackets-grid";
import type { RacketType } from "@/types/racket";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { useSWRConfig } from "swr";
import { LIMIT } from "./constants";
import styles from "./rackets.module.css";

const getPageFromLocation = (): number => {
  if (typeof window === "undefined") {
    return 1;
  }

  const raw = new URLSearchParams(window.location.search).get("page");
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
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

const fetcher = async (path: string, init?: RequestInit): Promise<RacketType[]> => {
  const response = await fetch(`${BASE_API_URL}/${path}`, {
    credentials: "include",
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${path}`);
  }

  const json: unknown = await response.json();
  if (!Array.isArray(json)) {
    throw new Error("Unexpected response shape");
  }
  return json as RacketType[];
};

export function RacketsContainer() {
  const [page, setPage] = useState<number>(1);
  const [brand, setBrand] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [isDiscoveringPages, setIsDiscoveringPages] = useState<boolean>(false);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    setPage(getPageFromLocation());
    setBrand(getBrandFromLocation());
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setPage(getPageFromLocation());
      setBrand(getBrandFromLocation());
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    setTotalPages(null);
  }, [brand]);

  const key = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(LIMIT));
    if (brand != null) {
      params.set("brand", brand);
    }
    return `products?${params.toString()}`;
  }, [brand, page]);

  const { data, error, isLoading, isValidating } = useSWR<RacketType[]>(
    key,
    fetcher,
    {
      revalidateIfStale: false,
    },
  );

  const rackets = data ?? [];

  const hasPrev = page > 1;
  const hasNext = !isLoading && rackets.length >= LIMIT;

  useEffect(() => {
    if (totalPages != null) {
      return;
    }

    const controller = new AbortController();

    const discoverTotalPages = async () => {
      setIsDiscoveringPages(true);

      try {
        let p = 1;
        while (true) {
          const params = new URLSearchParams();
          params.set("page", String(p));
          params.set("limit", String(LIMIT));
          if (brand != null) {
            params.set("brand", brand);
          }
          const probeKey = `products?${params.toString()}`;
          const items = await fetcher(probeKey, { signal: controller.signal });

          mutate(probeKey, items, false);

          if (items.length < LIMIT) {
            setTotalPages(Math.max(1, p));
            break;
          }

          p += 1;
        }
      } catch {
        // ignore (abort/network); we'll keep totalPages null
      } finally {
        setIsDiscoveringPages(false);
      }
    };

    void discoverTotalPages();

    return () => {
      controller.abort();
    };
  }, [brand, mutate, totalPages]);

  useEffect(() => {
    if (totalPages != null && page > totalPages) {
      updatePage(totalPages);
    }
  }, [page, totalPages]);

  const updatePage = (nextPage: number) => {
    const safeNext = nextPage > 0 ? nextPage : 1;

    const url = new URL(window.location.href);
    url.searchParams.set("page", String(safeNext));
    url.searchParams.set("limit", String(LIMIT));
    window.history.pushState({}, "", url.toString());

    setPage(safeNext);
  };

  if (error) {
    return <p>Ошибка загрузки ракеток</p>;
  }

  if (isLoading && rackets.length === 0) {
    return <p>{isValidating ? "Загрузка..." : "Загрузка..."}</p>;
  }

  if (!isLoading && rackets.length === 0) {
    return <p>Нет данных</p>;
  }

  return (
    <>
      <RacketsGrid rackets={rackets} title="Ракетки" />

      <nav className={styles.pagination} aria-label="Пагинация">
        <ul className={styles.paginationList}>
          <li>
            <button
              type="button"
              className={[
                styles.pageLink,
                !hasPrev ? styles.pageLinkDisabled : "",
              ].join(" ")}
              onClick={() => updatePage(page - 1)}
              disabled={!hasPrev}
              aria-disabled={!hasPrev}
            >
              Назад
            </button>
          </li>
          {totalPages == null ? (
            <li>
              <span
                className={[styles.pageLink, styles.pageLinkActive].join(" ")}
                aria-label={isDiscoveringPages ? "Загрузка страниц" : "Страница"}
              >
                {page}
              </span>
            </li>
          ) : (
            Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
              <li key={p}>
                <button
                  type="button"
                  className={[
                    styles.pageLink,
                    p === page ? styles.pageLinkActive : "",
                  ].join(" ")}
                  onClick={() => updatePage(p)}
                  aria-current={p === page ? "page" : undefined}
                >
                  {p}
                </button>
              </li>
            ))
          )}
          <li>
            <button
              type="button"
              className={[
                styles.pageLink,
                !hasNext ? styles.pageLinkDisabled : "",
              ].join(" ")}
              onClick={() => updatePage(page + 1)}
              disabled={!hasNext}
              aria-disabled={!hasNext}
            >
              Вперёд
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

