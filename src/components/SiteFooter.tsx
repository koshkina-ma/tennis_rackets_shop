import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link href="/" className="footer-logo">
          TENNIS STORE
        </Link>
        <div className="footer-copy">© 2026 Tennis Store. All rights reserved.</div>
      </div>
    </footer>
  );
}

