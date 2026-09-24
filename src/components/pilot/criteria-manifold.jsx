import Image from "next/image";

/**
 * The criteria manifold: three things a pilot is configured with, all of them
 * the lender's, feeding one collector — and out of it the only thing Cevrynt
 * adds, which is the reading behind each result rather than a rule of its own.
 *
 * The inputs are rows on the left of a collector bar that spans all of them,
 * and the output sits opposite the bar's middle, so the drawing says "three in,
 * one out" without a caption having to. Beneath it, the two things the pilot
 * will not do with those criteria, set under a rule of their own.
 *
 * Server-rendered and static — no script, no state.
 */
export function CriteriaManifold({ inputs, output, refusals, figure, readout, note }) {
  return (
    <figure className="pi3">
      <div className="pi3-flow" style={{ "--rows": inputs.length }}>
        <p className="pi3-k pi3-k-in">{readout.inK}</p>
        <p className="pi3-k pi3-k-out">{readout.outK}</p>

        {inputs.map((item, i) => (
          <div className="pi3-in" key={item.k} style={{ "--r": i + 1 }}>
            <p className="pi3-in-k">
              <span aria-hidden="true" className="pi3-in-n">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.k}
            </p>
            <p className="pi3-in-b">{item.body}</p>
          </div>
        ))}

        <span aria-hidden="true" className="pi3-collector" />

        <div className="pi3-out">
          <p className="pi3-out-k">{output.k}</p>
          <p className="pi3-out-b">{output.body}</p>
        </div>
      </div>

      <ul className="pi3-refusals">
        {refusals.map((item) => (
          <li className="pi3-refusal" key={item}>
            <span aria-hidden="true" className="pi3-refusal-x">
              ✕
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="pi3-fig">
        <Image
          alt={figure.alt}
          className="pi3-img"
          height={figure.h}
          loading="lazy"
          sizes="(max-width: 980px) 92vw, 1160px"
          src={figure.src}
          width={figure.w}
        />
        <figcaption className="pi3-cap">{figure.caption}</figcaption>
      </div>

      <p className="pi3-note">{note}</p>
    </figure>
  );
}
