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
      `http://localhost:4000/api/product/${id}`,
      { cache: "no-store" },
    );

    if (response.status === 404) {
      // сущность не найдена — не считаем это «ошибкой сервера»
      return { isError: false, data: null };
    }

    if (!response.ok) {
      return errorResponse;
    }

    const data: RacketType = await response.json();
    return { isError: false, data };
  } catch {
    return errorResponse;
  }
};
