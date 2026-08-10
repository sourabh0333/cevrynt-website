const headingLines = [
  "From borrower documents to",
  "decision-ready underwriting.",
];

const supportingCopy = "Turn borrower documents and business signals into evidence-linked analysis for human underwriting.";

function SignalMark() {
  const dots = [
    [18, 2], [18, 10], [18, 18], [18, 26], [18, 34],
    [2, 18], [10, 18], [26, 18], [34, 18],
    [10, 10], [26, 10], [10, 26], [26, 26],
  ];

  return (
    <svg className="hero-signal" viewBox="0 0 36 36" aria-hidden="true">
      {dots.map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.35" />)}
    </svg>
  );
}

export function AnimatedHeroCopy() {
  return (
    <>
      <SignalMark />
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
