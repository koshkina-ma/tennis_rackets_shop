import { revalidateTag } from "next/cache";

export function GET() {
  revalidateTag("top-10", "max");

  return Response.json({ message: "Top-10 tag revalidated" });
}