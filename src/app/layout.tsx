import { FC } from "react";
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
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
