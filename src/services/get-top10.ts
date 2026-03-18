import { BASE_API_URL } from "@/constants/api";
import { RacketType } from "@/types/racket";
import { ServerResponse } from "@/types/api";

export const getTop10 = async (): Promise<ServerResponse<RacketType[]>> => {
  const errorResponse: ServerResponse<RacketType[]> = {
    isError: true,
    data: [],
  };

  try {
    const response = await fetch(`${BASE_API_URL}/top-10`, {
      next: { tags: ["top-10"] },
    });

    if (!response.ok) {
      return errorResponse;
    }

    const data: RacketType[] = await response.json();
    return { isError: false, data };
  } catch {
    return errorResponse;
  }
}
