"use client";

import { UserContext } from "@/app/providers/user";
import { useSetIsFavorite } from "@/app/providers/favorite/hooks";
import type { RacketType } from "@/types/racket";
import { use, useCallback } from "react";
import { handleFavorite } from "./handle-favorite";

type Props = {
  isFavorite: boolean;
  productId: RacketType["id"];
};

export const ToggleFavoriteButton = ({ 
  isFavorite,
  productId,
 }: Props) => {
  const { user } = use(UserContext);
  const setFavorite = useSetIsFavorite();

  const handleClick = useCallback(
    async (): Promise<void> => {
      setFavorite({ id: productId, isFavorite: !isFavorite });
      await handleFavorite({ isFavorite, productId });
    },
    [setFavorite, isFavorite, productId]
  );

  if (user === undefined) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
    >
      {isFavorite ? "В избранном / Удалить" : "Добавить в избранное"}
    </button>
  );
};

