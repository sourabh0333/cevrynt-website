import Link from "next/link";
import { ArrowUpRight, SignalMark } from "@/components/icons";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main-content" className="error-404">
      <div className="error-404-orb" aria-hidden="true" />
      <div className="error-404-inner">
        <p className="eyebrow">Error</p>
        <div className="error-404-figure">
          <SignalMark className="error-404-signal" />
          <h1 className="error-404-number">404</h1>
        </div>
        <p className="error-404-lede">
          We couldn&rsquo;t verify this page. It may have moved, or the link may be out of date.
        </p>
        <Link className="primary-cta error-404-cta" href="/">
          Return home
          <span><ArrowUpRight /></span>
        </Link>
      </div>
    </main>
  );
}
