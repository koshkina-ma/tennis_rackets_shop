 "use client";

import Link from "next/link";
import styles from "./SiteHeader.module.css";
import NavLink from "../navlink/NavLink";

export function SiteHeader() {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.headerInner}>
        <div />
        <Link href="/" className={styles.logo}>
          TENNIS STORE
        </Link>
        <nav className={styles.nav}>
          <NavLink href="/" className={styles.navLink} activeClassName={styles.navLinkActive} exact>
            Главная
          </NavLink>
          <NavLink href="/rackets" className={styles.navLink} activeClassName={styles.navLinkActive} exact>
            Ракетки
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

