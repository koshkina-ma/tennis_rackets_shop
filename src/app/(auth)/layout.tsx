import { getUser } from "@/services/get-user";
import { UserProvider } from "../providers/user";
import { FC, PropsWithChildren } from "react";
import Layout from "@/components/layout/layout";
import { FavoriteProvider } from "../providers/favorite";

const AppLayout: FC<PropsWithChildren> = async ({ children }) => {
  const { data } = await getUser();

  console.log("data");
  console.log(data);

  return (
    <UserProvider user={data}>
      <FavoriteProvider>
        <Layout>{children}</Layout>
      </FavoriteProvider>
    </UserProvider>
  );
};

export default AppLayout;
