import { BASE_API_URL } from "@/constants/api";
import { RacketType } from "@/types/racket";
import { ServerResponse } from "@/types/api";
import { cookies } from "next/headers";

type GetRacketsParams = {
  page?: number;
  limit?: number;
}


export const getRackets = async ({
  page = 1,
  limit = 20,
}: GetRacketsParams = {}): Promise<ServerResponse<RacketType[]>> => {


  const cookieStore = await cookies();

  const errorResponse: ServerResponse<RacketType[]> = { 
    isError: true,
    data: []
  };

  try {
    const response = await fetch(`${BASE_API_URL}/products?page=${page}&limit=${limit}`, {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
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
