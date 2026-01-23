"use client";

import React from "react";
import { SiteHeader } from "../header/SiteHeader";
import { SiteFooter } from "../footer/SiteFooter";
import styles from "./Layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.siteRoot}>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}

