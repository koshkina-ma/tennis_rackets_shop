"use client";

import { RacketType } from "@/types/racket";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";

type SetFavoriteParams = {
  id: RacketType["id"];
  isFavorite: boolean;
};

interface FavoriteContextType {
  favorites: Record<RacketType["id"], boolean>;
  setFavorite: (params: SetFavoriteParams) => void;
}

export const FavoriteContext = createContext<FavoriteContextType>({
  favorites: {},
  setFavorite: () => {},
});

export const FavoriteProvider: FC<PropsWithChildren> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteContextType["favorites"]>(
    {}
  );

  const setFavorite = useCallback(({ id, isFavorite }: SetFavoriteParams) => {
    setFavorites((prev) => {
      if (prev[id] === isFavorite) {
        return prev;
      }

      console.log(prev);

      return {
        ...prev,
        [id]: isFavorite,
      };
    });
  }, []);

  return (
    <FavoriteContext value={{ favorites, setFavorite }}>
      {children}
    </FavoriteContext>
  );
};
