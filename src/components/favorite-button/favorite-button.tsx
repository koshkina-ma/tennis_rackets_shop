"use client";

import { UserContext } from "@/app/providers/user-provider";
import { use } from "react";

export const ToggleFavoriteButton = () => {
  const { user } = use(UserContext);

  if (user === undefined) {
    return null;
  }

  return <button type="button">Добавить в избранное</button>;
};
