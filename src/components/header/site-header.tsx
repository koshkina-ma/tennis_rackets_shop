 "use client";

import Link from "next/link";
import styles from "./site-header.module.css";
import NavLink from "../navlink/nav-link";
import { use } from "react";
import { UserContext } from "@/app/providers/user-provider";

export function SiteHeader() {

  const { user } = use(UserContext);

  console.log("header user");
  console.log(user);

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
          <NavLink href="/rackets/top-10" className={styles.navLink} activeClassName={styles.navLinkActive}>
            Топ-10
          </NavLink>
        </nav>
      </div>
      <div>{user?.name}</div>
    </header>
  );
}

