import Link from "next/link";

/**
 * The settle matrix: everything agreed before a file moves, with a marker in
 * the lane that decides it — your team, both of you, or Cevrynt.
 *
 * Rows and lanes share one grid, so the markers line up into columns and the
 * shape of the answer is readable before any of it is: nearly every lane that
 * matters is yours. The tally under each lane counts its own column, so the
 * drawing cannot disagree with the rows above it.
 *
 * Server-rendered and static — no script, no state.
 */
export function SettleMatrix({ lanes, rows, tallyK, link, note }) {
  const tally = lanes.map((lane) => rows.filter((row) => row.owner === lane.id).length);

  return (
    <figure className="pi4">
      <div className="pi4-grid" style={{ "--lanes": lanes.length }}>
        <p className="pi4-corner">{tallyK.settledK}</p>
        {lanes.map((lane) => (
          <p className={`pi4-lane-k is-${lane.id}`} key={lane.id}>
            {lane.label}
          </p>
        ))}

        {rows.map((row) => (
          <div className="pi4-row" key={row.k}>
            <p className="pi4-row-k">{row.k}</p>
            {lanes.map((lane) => (
              <span className={`pi4-cell${row.owner === lane.id ? " is-on" : ""}`} key={lane.id}>
                <span aria-hidden="true" className="pi4-dot" />
                <span className="pi4-sr">{row.owner === lane.id ? lane.label : ""}</span>
              </span>
            ))}
          </div>
        ))}

        <p className="pi4-corner pi4-corner-foot">{tallyK.countK}</p>
        {lanes.map((lane, i) => (
          <p className={`pi4-tally is-${lane.id}`} key={lane.id}>
            <span className="pi4-tally-n">{tally[i]}</span>
            <span className="pi4-tally-t">{tally[i] === 1 ? tallyK.one : tallyK.many}</span>
          </p>
        ))}
      </div>

      <p className="pi4-link">
        <Link className="pi4-link-a" href={link.href}>
          {link.label}
          <span aria-hidden="true" className="pi4-link-arrow">
            →
          </span>
        </Link>
      </p>

      <figcaption className="pi4-note">{note}</figcaption>
    </figure>
  );
}
