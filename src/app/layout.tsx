import { FC } from "react";
import Layout from "@/components/layout/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tennis Rackets Shop",
  description: "based on Next.js",
};

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
