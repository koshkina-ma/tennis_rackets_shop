import { RacketType } from "@/types/racket";

export const getTop10 = async (): Promise<{ 
    isError: boolean;
    data: RacketType[] 
}> => {
  try {
    const response = await fetch("http://localhost:4000/api/top-10", {
      cache: "no-store",
    });

    if (!response.ok) {
      return { isError: true, data: [] as RacketType[] };
    }

    const data: RacketType[] = await response.json();
    return { isError: false, data };
  } catch {
    return { isError: true, data: [] as RacketType[] };
  }
}
