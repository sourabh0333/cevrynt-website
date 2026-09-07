"use client";

/**
 * 03 — The relationship, set as a clause.
 *
 * This one is not a diagram and deliberately not a list with a device applied
 * to it. It is set the way the only comparable document in a lender's world is
 * set: a numbered clause, then its qualifications hanging beneath it in fine
 * print, the register of a term sheet rather than a marketing page.
 *
 * That is the whole idea. Partnership copy gets skimmed and remembered
 * generously, which is how a development and referral relationship becomes an
 * implied data pipe in somebody's head. Typography that signals "read this the
 * way you read a contract" does more work here than any drawing would, and it
 * is honest about what the section is: the one place on the site where the
 * precision is the product.
 *
 * There is no entrance animation. A clause that assembles itself is a clause
 * somebody is performing at you.
 */
export function PartnerClause({ clause, qualifications, readout, note }) {
  return (
    <figure className="cls">
      <div className="cls-head">
        <p className="cls-ref hx-mono">{readout.ref}</p>
        <p className="cls-of hx-mono">{readout.of}</p>
      </div>

      <div className="cls-body">
        <p className="cls-n hx-mono">1.</p>
        <p className="cls-v">{clause}</p>
      </div>

      <p className="cls-lead hx-mono">{readout.lead}</p>

      <ol className="cls-quals">
        {qualifications.map((q, i) => (
          <li className="cls-qual" key={q}>
            <span className="cls-qual-n hx-mono">1.{i + 1}</span>
            <span className="cls-qual-t">{q}</span>
          </li>
        ))}
      </ol>

      <p className="cls-foot">{readout.foot}</p>

      <figcaption className="cls-note">{note}</figcaption>
    </figure>
  );
}
