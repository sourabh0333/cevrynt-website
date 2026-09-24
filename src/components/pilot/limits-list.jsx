import Link from "next/link";

/**
 * What a pilot will not tell you: the thing somebody might hope it proves, set
 * large and struck out, with what is actually true beside it.
 *
 * No diagram here on purpose — four sections of drawn lines precede this one,
 * and the argument is better carried by the type. Claim and correction sit on
 * one grid, so the eye can read straight down either column.
 *
 * Server-rendered and static — no script, no state.
 */
export function LimitsList({ items, readout, close }) {
  return (
    <figure className="pi6">
      <div className="pi6-head" aria-hidden="true">
        <span className="pi6-head-k">{readout.claimK}</span>
        <span className="pi6-head-t">{readout.truthK}</span>
      </div>

      <ol className="pi6-list">
        {items.map((item, i) => (
          <li className="pi6-i" key={item.claim}>
            <p className="pi6-claim">
              <span aria-hidden="true" className="pi6-n">
                {String(i + 1).padStart(2, "0")}
              </span>
              <s>{item.claim}</s>
            </p>
            <div className="pi6-truth">
              <p className="pi6-truth-b">{item.truth}</p>
              {item.link ? (
                <p className="pi6-truth-link">
                  <Link className="pi6-truth-a" href={item.link.href}>
                    {item.link.label}
                    <span aria-hidden="true" className="pi6-truth-arrow">
                      →
                    </span>
                  </Link>
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <figcaption className="pi6-close">{close}</figcaption>
    </figure>
  );
}
