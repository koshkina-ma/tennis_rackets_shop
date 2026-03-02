import { RacketType } from "@/types/racket";
import { ServerResponse } from "@/types/api";

export const getTop10 = async (): Promise<ServerResponse<RacketType[]>> => {
  const errorResponse: ServerResponse<RacketType[]> = {
    isError: true,
    data: [],
  };

  try {
    const response = await fetch("http://localhost:4000/api/top-10", {
      cache: "no-store",
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
