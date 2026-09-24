import Link from "next/link";

/**
 * The scope slabs: the workflow written out as eight rows — each carrying what
 * a pilot would actually compare at that stage — with the scopes drawn as
 * nested margin brackets down the left of the rows they cover.
 *
 * The brackets are grid spans on the same rows as the text, so a scope reaches
 * exactly the stages it includes and the nesting is literal: the widest bracket
 * is the outermost gutter. The last row sits outside every bracket, which is
 * the argument the section exists to make.
 *
 * Server-rendered and static — no script, no measurement, no state.
 */
export function ScopeSlabs({ stages, scopes, outside, readout, note }) {
  return (
    <figure className="pi1">
      <div className="pi1-legend">
        <p className="pi1-k">{readout.scopesK}</p>
        <ol className="pi1-legend-list">
          {scopes.map((scope, i) => (
            <li className="pi1-legend-i" key={scope.label} style={{ "--d": i }}>
              <span aria-hidden="true" className="pi1-legend-mark" />
              <p className="pi1-legend-t">
                {scope.label}
                <span className="pi1-legend-span">{scope.span}</span>
              </p>
              <p className="pi1-legend-b">{scope.proves}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="pi1-slabs">
        <p className="pi1-k pi1-k-slabs">{readout.trackK}</p>
        <div className="pi1-grid" style={{ "--rows": stages.length }}>
          {/* The brackets, in their own gutters, spanning the rows they cover. */}
          {scopes.map((scope, i) => (
            <span
              aria-hidden="true"
              className="pi1-bracket"
              key={scope.label}
              style={{ "--d": i, "--from": scope.from, "--to": scope.to }}
            />
          ))}

          {stages.map((stage, i) => (
            <div className={`pi1-row${stage.outside ? " is-out" : ""}`} key={stage.name} style={{ "--r": i + 1 }}>
              <span aria-hidden="true" className="pi1-row-n">
                {String(i + 1).padStart(2, "0")}
              </span>
              {stage.href ? (
                <Link className="pi1-row-t" href={stage.href}>
                  {stage.name}
                </Link>
              ) : (
                <span className="pi1-row-t is-plain">{stage.name}</span>
              )}
              <span className="pi1-row-b">{stage.checks}</span>
              {stage.outside ? <span className="pi1-row-tag">{outside.tag}</span> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="pi1-out">
        <p className="pi1-out-t">{outside.title}</p>
        <p className="pi1-out-b">{outside.body}</p>
      </div>

      <figcaption className="pi1-note">{note}</figcaption>
    </figure>
  );
}
