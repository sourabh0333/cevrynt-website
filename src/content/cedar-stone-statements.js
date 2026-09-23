/* --------------------------------------------------------------------------
   Cedar & Stone LLC — the illustrative bank statements used across this site.

   One source for every page that draws these statements, so the figures
   cannot drift apart between them. Bank Statement Analysis draws the period,
   the positions, the balance and the flows; Fraud Signals reads individual
   lines out of the same days. A date, a balance or a debit means the same
   thing wherever it appears.

   The analysis window is May to July: the most recent three months, all
   inside an unbroken run. The submission itself holds six statement files —
   February to July, with March never supplied and July exported twice — as
   the Document Intelligence page shows. Nothing postdates the application.

   All of it is illustrative. None of it is a real account or a real borrower.
   -------------------------------------------------------------------------- */

/* The calendar. May 1 is a Wednesday, so a day index means the same weekday on
   every page that uses it. */
export const PERIOD_DAYS = 92;
export const weekdayOf = (i) => (3 + i) % 7;
export const periodMonths = [
  { k: "May", full: "May", days: 31 },
  { k: "Jun", full: "June", days: 30 },
  { k: "Jul", full: "July", days: 31 },
];

export const monthStarts = periodMonths.map((m, i) => periodMonths.slice(0, i).reduce((s, p) => s + p.days, 0));

export const dayLabel = (i) => {
  const m = monthStarts.filter((s) => s <= i).length - 1;
  return `${periodMonths[m].k} ${i - monthStarts[m] + 1}`;
};

/* Memorial Day and Independence Day: no ACH settles on either. */
export const positionHolidays = [
  { i: 26, k: "Holiday" },
  { i: 64, k: "Holiday" },
];

/* The existing advance with Rapid Advance Funding: $1,550 every business day
   across the whole window, the same position the homepage, Platform, MCA,
   Alternative Lenders, Brokers/ISOs and Why Cevrynt pages show. It predates
   the window; on May 21 it was renewed, and the renewal's $9,500 net proceeds
   are the one funding credit on these statements. */
export const DAILY_DEBIT = 1550;
export const RENEWAL_DAY = 20;
export const RENEWAL_NET = 9500;
export const dailyDebits = Array.from({ length: PERIOD_DAYS }, (_, i) => i).filter((i) => {
  const w = weekdayOf(i);
  return w >= 1 && w <= 5 && !positionHolidays.some((h) => h.i === i);
});

/* The weekly debit with no funding credit: $610 on nine consecutive Tuesdays,
   May 28 to July 23. */
export const WEEKLY_DEBIT = 610;
export const weeklyDebits = Array.from({ length: 9 }, (_, n) => 27 + n * 7);

/* A daily closing balance built from control points, then scaled on its
   positive days only so the mean is exactly the published $31.2K without
   moving a single day across zero. Negative on June 9–15 and July 28–29. */
function buildBalance() {
  const points = [
    [0, 28], [9, 41], [19, 30], [20, 39], [30, 36], [35, 14], [38, 2], [39, -3], [42, -8], [45, -2],
    [46, 6], [55, 34], [65, 48], [75, 44], [84, 18], [87, 3], [88, -2], [89, -1], [90, 9], [91, 22],
  ];
  const raw = [];
  for (let p = 0; p < points.length - 1; p += 1) {
    const [a, va] = points[p];
    const [b, vb] = points[p + 1];
    for (let i = a; i < b; i += 1) raw[i] = va + ((vb - va) * (i - a)) / (b - a);
  }
  raw[PERIOD_DAYS - 1] = points[points.length - 1][1];

  const pos = raw.filter((v) => v > 0).reduce((s, v) => s + v, 0);
  const neg = raw.filter((v) => v < 0).reduce((s, v) => s + v, 0);
  const k = (31.2 * PERIOD_DAYS - neg) / pos;
  return raw.map((v) => Math.round((v > 0 ? v * k : v) * 100) / 100);
}

/* Daily closing balance in $K. */
export const balanceSeries = buildBalance();

/* What the two positions take out of the account on a given day. */
export const repaymentsOn = (i) => (dailyDebits.includes(i) ? DAILY_DEBIT : 0) + (weeklyDebits.includes(i) ? WEEKLY_DEBIT : 0);

/* Daily inflows and outflows in whole dollars, derived from the balance so
   that every day's in minus out is exactly that day's change. Spending follows
   a weekday rhythm under a weekly pressure profile, and never falls below that
   day's repayments plus $400 of other spending; income is whatever the balance
   then requires. One offset on weekday spending is solved so total inflow is
   the $253,800 gross published for this file. */
export const OPENING_BALANCE = 28000;

function buildFlows(balance) {
  const bal = balance.map((v) => Math.round(v * 1000));
  const net = bal.map((v, i) => v - (i === 0 ? OPENING_BALANCE : bal[i - 1]));
  const pressure = [0.8, 0.95, 1.05, 1, 1.45, 1.6, 0.55, 0.6, 0.9, 1, 1.2, 1.75, 0.9];
  const weekend = (i) => weekdayOf(i) === 0 || weekdayOf(i) === 6;
  const base = (i) => (weekend(i) ? 350 : 3100) * pressure[Math.min(12, Math.floor(i / 7))];
  const floor = (i) => (repaymentsOn(i) ? repaymentsOn(i) + 400 : 0);
  const spend = (c) =>
    net.map((n, i) => Math.round(Math.max(base(i) + (weekend(i) ? 0 : c), 250 - n, floor(i)) / 10) * 10);
  const income = (out) => out.map((o, i) => o + net[i]);
  const sum = (a) => a.reduce((s, v) => s + v, 0);

  let lo = -6000;
  let hi = 6000;
  for (let t = 0; t < 60; t += 1) {
    const mid = (lo + hi) / 2;
    if (sum(income(spend(mid))) > 253800) hi = mid;
    else lo = mid;
  }
  const out = spend((lo + hi) / 2);
  out[PERIOD_DAYS - 1] += 253800 - sum(income(out));

  return { out, inflow: income(out), bal };
}

/* { out, inflow, bal } — daily dollars; bal is the closing balance in dollars. */
export const flows = buildFlows(balanceSeries);

export const sumRange = (a, from, to) => a.slice(from, to + 1).reduce((s, v) => s + v, 0);
