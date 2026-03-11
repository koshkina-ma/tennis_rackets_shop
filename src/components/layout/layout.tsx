"use client";

import React from "react";
import { SiteHeader } from "../header/site-header";
import { SiteFooter } from "../footer/site-footer";
import styles from "./layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.siteRoot}>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}

