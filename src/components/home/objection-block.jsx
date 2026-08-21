import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";

/**
 * The closing question set, rebuilt around a single lit rail.
 *
 * The previous version was busy: a numbered column, a two-bar cross, a hairline
 * above every row, and a sticky "keep reading" sidebar that never lined up with
 * the questions beside it. Four separate devices were competing to indicate the
 * same thing.
 *
 * Now there is one. A continuous hairline runs down the left of the whole list,
 * and the open question lights its own segment of it — so state is read from a
 * single rail rather than from per-row chrome. Nothing is boxed, nothing is
 * numbered, and there is no divider between rows: the questions are separated
 * by space and set large enough to scan.
 *
 * "Keep reading" moves underneath as one horizontal row. That drops the second
 * column entirely, which is what makes the section full width — and it removes
 * the left/right alignment problem rather than tuning around it.
 *
 * Still native details/summary, so keyboard operation, screen-reader semantics
 * and no-JS all come for free, and opening animates through `::details-content`
 * where the browser can transition to an intrinsic height.
 */
export function ObjectionBlock({ items, links }) {
  return (
    <section className="ob band-light" aria-labelledby="objections-heading">
      <div className="eg ob-head">
        <span className="eg-rail hx-mono">13</span>
        <div className="eg-head">
          <p className="hx-kicker">Before you ask</p>
          <h2 className="t-display-2" id="objections-heading">
            The questions underwriting teams ask before they put real files through Cevrynt.
          </h2>
        </div>
        <p className="eg-lede t-lede">
          Short answers to the questions that usually come before a pilot. Security, data handling, deployment, and deeper integration questions are covered in the full FAQ.
        </p>
      </div>

      <div className="eg ob-body">
        <div className="ob-main">
          <div className="ob-list">
            {items.map(([question, answer], index) => (
              /* Reveal renders the <details> itself and only arms the hidden
                 state client-side, so the questions stay visible without JS. */
              <Reveal as="details" className="ob-item" variant="rise" delay={index * 70} key={question}>
                <summary>
                  <span className="ob-seg" aria-hidden="true" />
                  <span className="ob-q">{question}</span>
                  <span className="ob-mark" aria-hidden="true" />
                </summary>
                <div className="ob-answer">
                  <p>{answer}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="ob-more">
            <p className="hx-mono ob-more-label">Keep reading</p>
            <ul className="ob-links">
              {links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href}>
                    <span>{label}</span>
                    <ArrowUpRight />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
