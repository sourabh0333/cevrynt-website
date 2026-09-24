import Link from "next/link";

/**
 * After the run: one axis for the point the evaluation ends, and two drops from
 * it — the decision going either way, given the same weight and the same width.
 *
 * The branches hang from the same rule on one two-column grid, so neither is
 * the default and the drawing does not lean toward the yes. Underneath, the one
 * thing that is true on both paths.
 *
 * Server-rendered and static — no script, no state.
 */
export function AfterSplit({ axis, branches, constant, note }) {
  return (
    <figure className="pi5">
      <div className="pi5-axis">
        <p className="pi5-axis-k pi5-axis-k-l">{axis.left}</p>
        <p className="pi5-axis-k pi5-axis-k-r">{axis.right}</p>
      </div>

      <div className="pi5-branches">
        {branches.map((branch, i) => (
          <div className="pi5-branch" key={branch.k} style={{ "--i": i }}>
            <span aria-hidden="true" className="pi5-drop" />
            <p className="pi5-branch-k">{branch.k}</p>
            <p className="pi5-branch-b">{branch.body}</p>
            {branch.link ? (
              <p className="pi5-branch-link">
                <Link className="pi5-branch-a" href={branch.link.href}>
                  {branch.link.label}
                  <span aria-hidden="true" className="pi5-branch-arrow">
                    →
                  </span>
                </Link>
              </p>
            ) : null}
          </div>
        ))}
      </div>

      <div className="pi5-constant">
        <p className="pi5-constant-k">{constant.k}</p>
        <p className="pi5-constant-b">{constant.body}</p>
      </div>

      <figcaption className="pi5-note">{note}</figcaption>
    </figure>
  );
}
