"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./nav-link.module.css";

type Props = {
  href: string;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
  children: React.ReactNode;
};

export default function NavLink({ href, className = "", activeClassName = "", exact, children }: Props) {
  const pathname = usePathname();

  const defaultExact = href === "/";
  const exactMatch = exact ?? defaultExact;

  let isActive = false;
  if (exactMatch) {
    isActive = pathname === href;
  } else {
    isActive = pathname === href || pathname.startsWith(href + "/");
  }

  const baseClass = className || styles.link;
  const activeClass = activeClassName || styles.active;
  const classNames = `${baseClass} ${isActive ? activeClass : ""}`.trim();

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
}

