"use client";

/**
 * 03 — An index, so the claims can be checked.
 *
 * A company page is where the unverifiable sentences usually live. This one is
 * built as an index instead: every claim this site makes about the product,
 * with the screen and the exact element on it where a reader can go and look.
 * Six claims, six places to check them, listed the way a reference is listed.
 *
 * Underneath, in the same index and the same typeface, the claims this site
 * does not make — with the source column left empty on purpose. They are in the
 * index because leaving them out is how a reader ends up assuming them. An
 * empty source column is a more honest entry than no entry at all.
 *
 * No entrance animation. An index that performs itself is not an index.
 */
export function ClaimIndex({ checkable, refused, readout, note }) {
  return (
    <figure className="ix">
      <dl className="ix-readout">
        <div className="ix-fig">
          <dt className="ix-fig-n">{String(checkable.length).padStart(2, "0")}</dt>
          <dd className="ix-fig-k hx-mono">{readout.checkable}</dd>
        </div>
        <div className="ix-fig ix-fig-none">
          <dt className="ix-fig-n">{String(refused.length).padStart(2, "0")}</dt>
          <dd className="ix-fig-k hx-mono">{readout.refused}</dd>
        </div>
      </dl>

      <div className="ix-table" role="table" aria-label={readout.tableLabel}>
        <div className="ix-row ix-row-head" role="row">
          <span className="ix-c-claim hx-mono" role="columnheader">{readout.claim}</span>
          <span className="ix-c-src hx-mono" role="columnheader">{readout.where}</span>
        </div>

        {checkable.map((c) => (
          <div className="ix-row" role="row" key={c.k}>
            <span className="ix-c-claim" role="cell">{c.k}</span>
            <span className="ix-c-src hx-mono" role="cell">{c.v}</span>
          </div>
        ))}

        <p className="ix-split hx-mono">{readout.split}</p>

        {refused.map((r) => (
          <div className="ix-row is-refused" role="row" key={r}>
            <span className="ix-c-claim" role="cell">{r}</span>
            {/* Empty on purpose: there is nothing to point at. */}
            <span className="ix-c-src hx-mono" role="cell">
              <span className="ix-none">{readout.none}</span>
            </span>
          </div>
        ))}
      </div>

      <figcaption className="ix-note">{note}</figcaption>
    </figure>
  );
}
