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
  const setIsFavorite = useSetIsFavorite();

  useEffect(() => {
    if (typeof isFavorite === "boolean") {
      setIsFavorite({
        isFavorite: isFavorite,
        id: racketId,
      });
    }
  }, [racketId, isFavorite, setIsFavorite]);
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

  //   console.log("isFavoriteGlobal");
  //   console.log(isFavoriteGlobal);

  const isFavorite = isFavoriteGlobal ?? isFavoriteInitial;

  return Boolean(isFavorite);
};
