"use client";

import React from "react";
import NextTopLoader from "nextjs-toploader";
import { SiteHeader } from "../header/site-header";
import { SiteFooter } from "../footer/site-footer";
import styles from "./layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.siteRoot}>
      <NextTopLoader showSpinner={false} />
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}

