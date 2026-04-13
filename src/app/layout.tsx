import { FC } from "react";
import { Roboto } from "next/font/google";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tennis Rackets Shop",
  description: "based on Next.js",
};

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
});

const RootLayout: FC<
 Readonly<{
  children: React.ReactNode;
 }>
 > = ({ children }) => {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
