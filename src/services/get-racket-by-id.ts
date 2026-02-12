import { RacketType } from "@/types/racket";

type Params = {
  id: string;
}

export const getRacketById = async ({id} : Params) => {
  
    const response = await fetch(`http://localhost:4000/api/products/${id}`,
      { cache: "no-store" }
    );
   

    if (!response.ok) {
      return { isError: true, data: [] as RacketType[] };
    }

    const data: RacketType[] = await response.json();
    return { isError: false, data };

};
