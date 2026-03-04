import { BASE_API_URL } from "@/constants/api";
import { RacketType } from "@/types/racket";
import { ServerResponse } from "@/types/api";

type Params = {
  id: string;
};

export const getRacketById = async (
  { id }: Params,
): Promise<ServerResponse<RacketType | null>> => {
  const errorResponse: ServerResponse<RacketType | null> = {
    isError: true,
    data: null,
  };

  try {
    const response = await fetch(
      `${BASE_API_URL}/product/${id}`,
      { cache: "no-store" },
    );

    if (response.status === 404) {
      return { isError: false, data: null };
    }

    if (!response.ok) {
      return errorResponse;
    }

    const json: { product?: RacketType } = await response.json();
    if (!json.product) {
      return { isError: false, data: null };
    }
    return { isError: false, data: json.product };
  } catch {
    return errorResponse;
  }
};
