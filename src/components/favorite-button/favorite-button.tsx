"use client";

import { UserContext } from "@/app/providers/user";
import { BASE_API_URL } from "@/constants/api";
import { useSetIsFavorite } from "@/providers/favorite/hooks";
import { use, useCallback } from "react";

type Props = {
  isFavorite: boolean;
  productId: number;
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

export const ToggleFavoriteButton = ({ isFavorite, productId }: Props) => {
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
