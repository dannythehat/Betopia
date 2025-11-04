/**
 * Compute singles and acca P/L from a list of bets.
 * P/L rules:
 *   - Single: won => (odds - 1) * stake; lost => -stake; void => 0; pending => null
 *   - Acca (one per day): any lost => -accaStake; void legs => odds=1.0; pending => null until all settled;
 *     all won/void and all "won" legs have odds => (product(odds) - 1) * accaStake.
 */
export function computePL(bets, stake = 10, accaStake = 5) {
  const safeNum = (x) => (typeof x === "number" && isFinite(x) ? x : null);
  const result = { stake, accaStake };

  // Singles
  const singles = bets.map(b => {
    const status = String(b.status || "pending").toLowerCase();
    const odds = safeNum(b.odds);
    let pl = null;

    if (status === "won") {
      pl = (odds !== null) ? (odds - 1) * stake : null; // need odds to value a win
    } else if (status === "lost") {
      pl = -stake;
    } else if (status === "void") {
      pl = 0;
    } else {
      pl = null; // pending
    }

    return {
      id: b.id,
      market: b.market,
      pick: b.pick,
      status,
      odds,
      stake,
      pl
    };
  });

  const singles_settled = singles.filter(s => s.pl !== null);
  const singles_total_pl = singles_settled.reduce((a, s) => a + s.pl, 0);
  const singles_staked   = singles_settled.length * stake;

  // Acca (use all bets of the day)
  const legs = bets.map(b => ({
    status: String(b.status || "pending").toLowerCase(),
    odds: safeNum(b.odds)
  }));

  const anyLost   = legs.some(l => l.status === "lost");
  const anyPend   = legs.some(l => l.status === "pending");
  const onlyWonOrVoid = legs.every(l => l.status === "won" || l.status === "void");

  let acca_status = "pending";
  let acca_pl = null;
  let acca_odds_product = null;

  if (anyLost) {
    acca_status = "lost";
    acca_pl = -accaStake;
  } else if (anyPend) {
    acca_status = "pending";
    acca_pl = null;
  } else if (onlyWonOrVoid) {
    const wonLegs = legs.filter(l => l.status === "won");
    const missingOdds = wonLegs.some(l => l.odds === null);
    if (missingOdds) {
      acca_status = "won"; // but cannot value without odds
      acca_pl = null;
    } else {
      // Treat void legs as odds=1.0
      acca_odds_product = legs.reduce((prod, l) => prod * (l.status === "void" ? 1.0 : l.odds), 1.0);
      acca_status = "won";
      acca_pl = (acca_odds_product - 1) * accaStake;
    }
  }

  // Totals
  const total_pl = (typeof singles_total_pl === "number" ? singles_total_pl : 0) +
                   (typeof acca_pl === "number" ? acca_pl : 0);

  // ROI on settled money only
  const acca_staked_if_settled = (acca_status === "lost" || (acca_status === "won" && acca_pl !== null)) ? accaStake : 0;
  const total_staked_settled = singles_staked + acca_staked_if_settled;
  const roi = total_staked_settled > 0 ? total_pl / total_staked_settled : null;

  return {
    singles,
    singles_summary: {
      settled_count: singles_settled.length,
      settled_staked: singles_staked,
      total_pl: singles_total_pl
    },
    acca: {
      status: acca_status,
      odds_product: acca_odds_product,
      stake: accaStake,
      pl: acca_pl
    },
    totals: {
      total_pl,
      total_staked_settled,
      roi
    }
  };
}
