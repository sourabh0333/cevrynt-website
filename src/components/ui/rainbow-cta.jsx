import { ArrowUpRight } from "@/components/icons";

export function RainbowCta({ href, label = "Get a demo", className = "", ...linkProps }) {
  return (
    <span className="rainbow-border-glow hero-primary-cta-glow">
      <a className={`primary-cta hero-primary-cta ${className}`.trim()} href={href} target="_blank" rel="noreferrer" {...linkProps}>
        <span className="cta-swap cta-swap-base">{label} <ArrowUpRight /></span>
        <span className="cta-swap cta-swap-hover" aria-hidden="true">{label} <ArrowUpRight /></span>
      </a>
    </span>
  );
}
