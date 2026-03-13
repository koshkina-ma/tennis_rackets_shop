import { revalidatePath, revalidateTag } from "next/cache";

export function GET() {
    revalidateTag("top-10");
    revalidatePath("rackets/top-10");
    return Response.json({ message: "Revalidated" });
}