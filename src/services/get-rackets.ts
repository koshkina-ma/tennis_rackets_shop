import { RacketType } from "@/types/racket";

export const getRackets = async (): Promise<{ 
    isError: boolean;
    data: RacketType[] 
}> => {
  try {
    const response = await fetch("http://localhost:4000/api/products?page=1&limit=20", {
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
