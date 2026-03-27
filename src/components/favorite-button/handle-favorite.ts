"use server";

import { BASE_API_URL } from "@/constants/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

interface Params {
  isFavorite: boolean;
  productId: number;
}

export const handleFavorite = async ({ isFavorite, productId }: Params) => {
  const cookiesStore = await cookies();

  const url = `${BASE_API_URL}/product/${productId}/favorite`;

  await (isFavorite
    ? fetch(url, {
        headers: {
          Cookie: cookiesStore.toString(),
        },
        method: "DELETE",
      })
    : fetch(url, {
        headers: {
          Cookie: cookiesStore.toString(),
        },
        method: "POST",
      }));

  revalidateTag("getRackets");
};
