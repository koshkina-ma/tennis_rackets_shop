"use client";

import { UserContext } from "@/app/providers/user";
import { BASE_API_URL } from "@/constants/api";
import { useSetIsFavorite } from "@/app/providers/favorite/hooks";
import type { RacketType } from "@/types/racket";
import { use, useCallback } from "react";

type Props = {
  isFavorite: boolean;
  productId: RacketType["id"];
};

const handleFavorite = async ({ isFavorite, productId }: Props): Promise<Response> => {
  const url = `${BASE_API_URL}/product/${productId}/favorite`;

  return isFavorite
    ? fetch(url, {
        credentials: "include",
        method: "DELETE",
      })
    : fetch(url, {
        credentials: "include",
        method: "POST",
      });
};

export const ToggleFavoriteButton = ({ 
  isFavorite: isFavoriteInitial,
  productId,
 }: Props) => {
  const { user } = use(UserContext);
  const setFavorite = useSetIsFavorite();

  const handleClick = useCallback(
    async ({ isFavorite, productId }: Props): Promise<void> => {
      setFavorite({ id: productId, isFavorite: !isFavorite });
      await handleFavorite({ isFavorite, productId });
    },
    [setFavorite]
  );

  if (user === undefined) {
    return null;
  }

  return (
    <button type="button" onClick={() => handleClick({ isFavorite, productId })}>
      {isFavorite ? "В избранном" : "Добавить в избранное"}
    </button>
  );
};
//TODO наверное нужно посмотреть сначала все его видео, а потом вносить правки, потому что он рассказывает
//про два способа обработки событий, и я похоже перемешала оба этих подхода.
