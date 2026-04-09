import { RacketType } from "@/types/racket";
import { use, useEffect } from "react";
import { FavoriteContext } from ".";

export const useSetIsFavorite = () => {
  const { setFavorite } = use(FavoriteContext);

  return setFavorite;
};

export const useHydrateFavorite = ({
  racketId,
  isFavorite,
}: {
  racketId: RacketType["id"];
  isFavorite?: boolean;
}) => {
  const { favorites, setFavorite: setIsFavorite } = use(FavoriteContext);

  useEffect(() => {
    console.log('hydrate', racketId, isFavorite, 'in favorites:', racketId in favorites);
    if (typeof isFavorite === "boolean" && !(racketId in favorites)) {
      setIsFavorite({
        isFavorite: isFavorite,
        id: racketId,
      });
    }
  }, [racketId, isFavorite, setIsFavorite, favorites]);
};

export const useIsFavoriteById = ({
  id,
  isFavoriteInitial,
}: {
  id: RacketType["id"];
  isFavoriteInitial?: boolean;
}): boolean => {
  const { favorites } = use(FavoriteContext);
  const isFavoriteGlobal = favorites[id] ?? null;

  const isFavorite = isFavoriteGlobal ?? isFavoriteInitial;

  return Boolean(isFavorite);
};
