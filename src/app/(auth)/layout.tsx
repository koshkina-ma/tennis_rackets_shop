import { getUser } from "@/services/get-user";
import { UserProvider } from "../providers/user-provider";
import { FC, PropsWithChildren } from "react";
import Layout from "@/components/layout/layout";

const AppLayout: FC<PropsWithChildren> = async ({ children }) => {
  const { data } = await getUser();

  console.log("data");
  console.log(data);

  return (
    <UserProvider user={data}>
      <Layout>{children}</Layout>
    </UserProvider>
  );
};

export default AppLayout;
