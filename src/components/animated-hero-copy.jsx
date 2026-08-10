const headingLines = [
  "From borrower documents to",
  "decision-ready underwriting.",
];

const supportingCopy = "Cevrynt helps alternative lenders turn borrower documents and business signals into evidence-linked analysis for faster, consistent human review.";
const supportingWords = supportingCopy.split(" ");

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
            {Array.from(line).map((character, index) => (
              <span className="hero-char" key={`${character}-${index}`}>
                {character === " " ? "\u00a0" : character}
              </span>
            ))}
          </span>
        ))}
      </h1>
      <p className="home-hero-lede" aria-label={supportingCopy}>
        <span aria-hidden="true">
          {supportingWords.map((word, index) => (
            <span className="hero-word" key={`${word}-${index}`}>{word}{index < supportingWords.length - 1 ? "\u00a0" : ""}</span>
          ))}
        </span>
      </p>
    </>
  );
}
