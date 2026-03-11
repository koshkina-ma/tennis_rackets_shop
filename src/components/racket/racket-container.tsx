import RacketDetails from "./racket-details";
import type { RacketType } from "@/types/racket";

type Props = {
  racket: RacketType;
};

export default function RacketContainer({ racket }: Props) {
  return <RacketDetails racket={racket} />;
}

