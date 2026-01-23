import { FC } from "react";
import Layout from "../components/layout/Layout";

const RootLayout: FC<
 Readonly<{
  children: React.ReactNode;
 }>
 > = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
};

export default RootLayout;
