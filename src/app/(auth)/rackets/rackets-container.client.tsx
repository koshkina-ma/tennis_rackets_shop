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
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [isDiscoveringPages, setIsDiscoveringPages] = useState<boolean>(false);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    setPage(getPageFromLocation());
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setPage(getPageFromLocation());
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const key = useMemo(() => `products?page=${page}&limit=${LIMIT}`, [page]);

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
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const probeKey = `products?page=${p}&limit=${LIMIT}`;
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
  }, [mutate, totalPages]);

  useEffect(() => {
    if (totalPages != null && page > totalPages) {
      updatePage(totalPages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

