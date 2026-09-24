import Image from "next/image";

/**
 * The comparison ladder: two rails — the review your underwriters already did,
 * and what Cevrynt prepared from the same file — with one rung for each thing
 * the pilot compares between them.
 *
 * Each rung is a row on a three-column grid, so the two sides stay on one
 * baseline and the measure sits on the line that joins them. The last rung is
 * drawn cut, because approval rate is the one comparison a pilot refuses to
 * make: it would measure the lender's appetite rather than the work on the file.
 *
 * Server-rendered and static — no script, no state.
 */
export function ComparisonLadder({ order, rails, rungs, cut, figure, note }) {
  return (
    <div className="pi2">
      <ol className="pi2-order">
        {order.map((step, i) => (
          <li className="pi2-order-i" key={step}>
            <span aria-hidden="true" className="pi2-order-n">
              {i + 1}
            </span>
            <span className="pi2-order-t">{step}</span>
          </li>
        ))}
      </ol>

      <div className="pi2-ladder">
        <div className="pi2-rails">
          <p className="pi2-rail-k pi2-rail-k-l">{rails.left}</p>
          <p className="pi2-rail-k pi2-rail-k-c">{rails.centre}</p>
          <p className="pi2-rail-k pi2-rail-k-r">{rails.right}</p>
        </div>

        <ol className="pi2-rungs">
          {rungs.map((rung, i) => (
            <li className="pi2-rung" key={rung.k} style={{ "--i": i }}>
              <p className="pi2-side pi2-side-l">{rung.yours}</p>
              <p className="pi2-mid">
                <span aria-hidden="true" className="pi2-line" />
                <span className="pi2-k">
                  <span aria-hidden="true" className="pi2-n">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {rung.k}
                </span>
              </p>
              <p className="pi2-side pi2-side-r">{rung.ours}</p>
            </li>
          ))}

          <li className="pi2-rung is-cut">
            <p className="pi2-side pi2-side-l">{cut.yours}</p>
            <p className="pi2-mid">
              <span aria-hidden="true" className="pi2-line" />
              <span className="pi2-k">
                <s>{cut.k}</s>
              </span>
            </p>
            <p className="pi2-side pi2-side-r">{cut.ours}</p>
          </li>
        </ol>

        <p className="pi2-cut-why">{cut.why}</p>
      </div>

      <figure className="pi2-fig">
        <Image
          alt={figure.alt}
          className="pi2-img"
          height={figure.h}
          loading="lazy"
          sizes="(max-width: 980px) 92vw, 1160px"
          src={figure.src}
          width={figure.w}
        />
        <figcaption className="pi2-cap">{figure.caption}</figcaption>
      </figure>

      <p className="pi2-note">{note}</p>
    </div>
  );
}
