import { BASE_API_URL } from "@/constants/api";
import { RacketType } from "@/types/racket";
import { ServerResponse } from "@/types/api";

type Params = {
  id: string;
};

export const getRacketOgDataById = async ({
  id,
}: Params): Promise<ServerResponse<RacketType | null> > => {
  const result = await fetch(`${BASE_API_URL}/product/${id}`, {
    cache: "force-cache",
  });

  if (result.status === 404) {
    return { isError: false, data: null };
  }

  if (!result.ok) {
    return { isError: true, data: null };
  }

  const data: { product: RacketType } = await result.json();

  return { isError: false, data: data.product };
};
