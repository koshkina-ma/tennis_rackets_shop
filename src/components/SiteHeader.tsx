"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function SiteHeader() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isRackets = pathname === "/rackets" || pathname.startsWith("/rackets/");

  return (
    <header className="site-header">
      <div className="header-inner">
        <div />
        <div className="brand">TENNIS STORE</div>
        <nav className="nav">
          <Link href="/" className={cx("nav-link", isHome && "nav-link--active")}>
            Главная
          </Link>
          <Link href="/rackets" className={cx("nav-link", isRackets && "nav-link--active")}>
            Ракетки
          </Link>
        </nav>
      </div>
    </header>
  );
}

