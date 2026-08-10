import { SignalMark } from "@/components/icons";

const headingLines = [
  "From borrower documents to",
  "decision-ready underwriting.",
];

const supportingCopy = "Turn borrower documents and business signals into evidence-linked analysis for human underwriting.";

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
