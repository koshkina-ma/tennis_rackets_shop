"use client";

import { UserContext } from "@/app/providers/user-provider";
import { use } from "react";

type Props = {
  isFavorite?: boolean;
};

export const ToggleFavoriteButton = ({ isFavorite }: Props) => {
  const { user } = use(UserContext);

  if (user === undefined) {
    return null;
  }

  return (
    <button type="button">
      {isFavorite ? "В избранном" : "Добавить в избранное"}
    </button>
  );
};
