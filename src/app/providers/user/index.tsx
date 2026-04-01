"use client";

import { User } from "@/types/user";
import { createContext, FC, PropsWithChildren } from "react";

type UserContextType = {
  user: User | undefined;
}
export const UserContext = createContext<UserContextType>({ user: undefined });

type UserProviderProps = PropsWithChildren<{
  user: User | undefined;
}>;

export const UserProvider: FC<UserProviderProps> = ({ user, children }) => {
  console.log(user);
  return <UserContext value={{ user }}>{children}</UserContext>;
};
