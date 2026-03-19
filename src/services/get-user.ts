import { BASE_API_URL } from "@/constants/api";
import { ServerResponse } from "@/types/api";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export const getUser = async (): Promise<ServerResponse<User | undefined>> => {
  const cookieStore = await cookies();

  const result = await fetch(`${BASE_API_URL}/api/auth/user`, {
    credentials: "include",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

 

  if (result.status === 401) {
    return { isError: false, data: undefined };
  }

 

  if (!result.ok) {
    return { isError: true, data: undefined };
  }

  const data: { user: User } = await result.json();

  console.log(data);

  return { isError: false, data: data.user };
};
