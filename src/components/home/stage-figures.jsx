/**
 * Code-built illustrative figures, one per capability stage.
 *
 * These are placeholders with real structure: when product screenshots are
 * exported, pass `image` on a stage in `how-it-works.jsx` and the figure is
 * replaced by the screenshot with no layout change. Target export size is
 * 1200x900 (4:3), WebP or AVIF.
 *
 * Nothing here represents real borrower data.
 */

function Rows({ items }) {
  return (
    <ul className="fig-rows">
      {items.map(([label, value, tone], index) => (
        <li key={label} data-tone={tone || "neutral"} style={{ "--row": index }}>
          <span>{label}</span>
          <b>
            {tone === "warn" || tone === "note" ? <i className="fig-pulse" aria-hidden="true" /> : null}
            {value}
          </b>
        </li>
      ))}
    </ul>
  );
}

function Documents() {
  return (
    <div className="fig">
      <Rows
        items={[
          ["Bank statements · Jan–Jun", "6 files", "ok"],
          ["Signed application", "1 file", "ok"],
          ["Business tax return", "2 files", "ok"],
          ["Voided cheque", "1 file", "ok"],
          ["Unclassified", "None", "ok"],
        ]}
      />
      <p className="fig-caption">Every extracted field stays linked to its source page.</p>
    </div>
  );
}

/** Deposit rhythm over six months. Heights are illustrative, not measured. */
function Financials() {
  const bars = [58, 72, 46, 81, 64, 77];
  return (
    <div className="fig">
      <svg className="fig-chart" viewBox="0 0 300 110" role="img" aria-label="Illustrative deposit rhythm across six months">
        <line x1="0" y1="92" x2="300" y2="92" className="fig-axis" />
        {bars.map((h, i) => (
          <rect
            key={i}
            x={12 + i * 48}
            y={92 - h}
            width="26"
            height={h}
            rx="3"
            className={i === 3 ? "fig-bar is-peak" : "fig-bar"}
            style={{ "--bar": i, "--h": `${h}px` }}
          />
        ))}
        <polyline
          className="fig-spark"
          points={bars.map((h, i) => `${25 + i * 48},${92 - h - 6}`).join(" ")}
        />
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => (
          <text key={m} x={25 + i * 48} y="106" className="fig-tick">{m}</text>
        ))}
      </svg>
      <Rows
        items={[
          ["Average daily balance", "Reviewed", "ok"],
          ["Deposit consistency", "Reviewed", "ok"],
          ["Negative days", "3 flagged", "warn"],
        ]}
      />
    </div>
  );
}

function Verification() {
  return (
    <div className="fig">
      <Rows
        items={[
          ["Entity status", "Active", "ok"],
          ["Registered address", "Conflict", "warn"],
          ["Officer match", "Match", "ok"],
          ["Document integrity", "Reviewed", "ok"],
          ["Duplicate application", "None found", "ok"],
        ]}
      />
      <p className="fig-caption">Conflicts are raised for a person to resolve, never auto-declined.</p>
    </div>
  );
}

function Policy() {
  return (
    <div className="fig">
      <Rows
        items={[
          ["Time in business ≥ 12 months", "Meets", "ok"],
          ["Monthly deposits ≥ $15,000", "Meets", "ok"],
          ["Negative days ≤ 2", "Exception", "warn"],
          ["Reviewer override", "Recorded", "note"],
        ]}
      />
      <p className="fig-caption">Your policy and your exceptions — not a fixed credit box.</p>
    </div>
  );
}

function Report() {
  return (
    <div className="fig">
      <Rows
        items={[
          ["Findings", "12 linked", "ok"],
          ["Source documents", "10 attached", "ok"],
          ["Reviewer notes", "Included", "ok"],
          ["Policy exceptions", "1 documented", "warn"],
          ["Final decision", "With lender", "note"],
        ]}
      />
      <p className="fig-caption">Retraceable months later, by someone who wasn’t there.</p>
    </div>
  );
}

export const stageFigures = {
  documents: Documents,
  financials: Financials,
  verification: Verification,
  policy: Policy,
  report: Report,
};
