import { SignalMark } from "@/components/icons";

const headingLines = [
  "Underwrite the deal, not ",
  "the paperwork.",
];

const supportingCopy = "Cevrynt turns borrower documents, bank activity, business checks, debt positions and lender rules into one evidence-linked underwriting view—so your team can review the full story without chasing files across tools.";

export function AnimatedHeroCopy() {
  return (
    <>
      <SignalMark className="hero-signal" />
      <h1 className="hero-animated-heading" aria-label={headingLines.join(" ")}>
        {headingLines.map((line) => (
          <span className="hero-heading-line" aria-hidden="true" key={line}>
            <span className="hero-line-text">{line}</span>
          </span>
        ))}
      </h1>
      <p className="home-hero-lede">{supportingCopy}</p>
    </>
  );
}
