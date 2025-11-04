function fmtMoney(n) {
  if (n === null || n === undefined) return "—";
  return (n >= 0 ? "+£" : "-£") + Math.abs(n).toFixed(2);
}
function fmtROI(x) {
  if (x === null || x === undefined) return "—";
  return (x * 100).toFixed(1) + "%";
}

async function loadPL() {
  const res = await fetch("/api/pl/compute?stake=10&accaStake=5", { cache: "no-store" });
  if (!res.ok) throw new Error("PL HTTP " + res.status);
  const j = await res.json();

  const singlesPL = j?.singles_summary?.total_pl ?? null;
  const accaPL = j?.acca?.pl ?? null;
  const roi = j?.totals?.roi ?? null;

  document.getElementById("kpi-singles-pl").textContent = fmtMoney(singlesPL);
  document.getElementById("kpi-acca-pl").textContent = fmtMoney(accaPL);
  document.getElementById("kpi-roi").textContent = fmtROI(roi);
}

async function loadBets() {
  const status = document.getElementById("status");
  const list = document.getElementById("list");
  list.innerHTML = "";
  status.textContent = "Loading…";

  const res = await fetch("/api/smart-bets", { cache: "no-store" });
  if (!res.ok) {
    status.textContent = "No Smart Bets for today yet.";
    list.innerHTML = "<div class='card'>Could not fetch /api/smart-bets (HTTP " + res.status + ").</div>";
    return;
  }
  const data = await res.json();
  status.textContent = `Date: ${data.date} • Bets: ${data.bets?.length ?? 0}`;

  if (!data.bets || data.bets.length === 0) {
    list.innerHTML = "<div class='card'>No Smart Bets published for today yet.</div>";
    return;
  }

  for (const b of data.bets) {
    const color = (b.confidence_color || "yellow").toLowerCase();
    const probPct = Math.round((b.probability ?? 0) * 100);

    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div class="row">
        <div><strong>${b.home}</strong> vs <strong>${b.away}</strong></div>
        <span class="badge">${b.league?.name ?? ""}</span>
        <span class="badge muted">${new Date(b.kickoff_utc).toLocaleString()}</span>
        <span class="badge ${color}">${probPct}%</span>
      </div>
      <div class="grid" style="margin-top:8px;">
        <div class="pick">${b.market}: ${b.pick}</div>
        <div class="odds">${b.odds ? `Odds: ${b.odds}` : ""}</div>
      </div>
      <div class="reason">${b.ai_reasoning ?? ""}</div>
    `;
    list.appendChild(div);
  }
}

async function init() {
  try { await loadPL(); } catch (e) { console.error(e); }
  try { await loadBets(); } catch (e) { console.error(e); }
}
init();
