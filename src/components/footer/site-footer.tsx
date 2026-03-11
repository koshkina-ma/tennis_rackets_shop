import Link from "next/link";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerInner}>
        <Link href="/" className={styles.footerLogo}>
          TENNIS STORE
        </Link>
        <div className={styles.footerCopy}>© 2026 Tennis Store. All rights reserved.</div>
      </div>
    </footer>
  );
}

