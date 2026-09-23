/* --------------------------------------------------------------------------
   The shape of one article, measured from its own text.

   Sections are split at each h2; everything before the first h2 is the
   introduction. Every string in a block counts toward its section, whatever
   the block type. Minutes use the same 230 words-per-minute rate as each
   article's readingTime, so a section's minutes read in the same units.
   -------------------------------------------------------------------------- */

export const WORDS_PER_MINUTE = 230;

export function wordsIn(value, key) {
  if (key === "type" || key === "id") return 0;
  if (typeof value === "string") return value.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").split(/\s+/).filter(Boolean).length;
  if (Array.isArray(value)) return value.reduce((n, v) => n + wordsIn(v), 0);
  if (value && typeof value === "object") return Object.entries(value).reduce((n, [k, v]) => n + wordsIn(v, k), 0);
  return 0;
}

export function anatomyOf(post) {
  const raw = [];
  let cur = { id: "", title: "Introduction", words: 0 };
  post.body.forEach((b) => {
    if (b.type === "h2") {
      raw.push(cur);
      cur = { id: b.id, title: b.text, words: 0 };
    } else {
      cur.words += wordsIn(b);
    }
  });
  raw.push(cur);

  const total = raw.reduce((n, s) => n + s.words, 0) || 1;
  const sections = raw
    .filter((s) => s.words > 0 || s.id)
    .map((s) => ({
      id: s.id,
      title: s.title,
      words: s.words,
      share: s.words / total,
      // Under a minute still reads as "under 1 min", never as zero.
      minutes: s.words / WORDS_PER_MINUTE,
      cevrynt: /cevrynt/i.test(s.title),
    }));
  const cevrynt = sections.find((s) => s.cevrynt) || null;

  return {
    sections,
    total,
    cevrynt,
    cevryntShare: cevrynt ? Math.round(100 * cevrynt.share) : 0,
    cevryntLast: Boolean(cevrynt) && sections[sections.length - 1] === cevrynt,
  };
}
