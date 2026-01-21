import { FC } from "react";
import "../styles/site.css";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

const RootLayout: FC<
 Readonly<{
  children: React.ReactNode;
 }>
 > = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="site-root">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
