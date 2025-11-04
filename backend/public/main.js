async function load() {
  const status = document.getElementById("status");
  const list = document.getElementById("list");
  list.innerHTML = "";
  status.textContent = "Loading…";

  try {
    const res = await fetch("/api/smart-bets", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
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
  } catch (err) {
    console.error(err);
    status.textContent = "Failed to load today’s Smart Bets.";
    list.innerHTML = "<div class='card'>Could not fetch /api/smart-bets. Check server logs.</div>";
  }
}
load();
