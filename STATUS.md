# STATUS

**Now:** Foundation only. Repo structure and documentation created.
**Next:** Initialize git, create remote, push docs. Then begin MVP scaffolding (no heavy code).

- Step A (today): Initialize local git and push to GitHub.
- Step B: Add fixture browser spec + Smart Bets JSON schema (docs).
- Step C: Start minimal backend health (later).

Now: Phase 1.1 schema + sample created on 2025-11-04
Now: Phase 1.2 minimal backend created on 2025-11-04

# === Update STATUS.md + ROADMAP.md and push ===
$root = "C:\Users\Danny\Documents\GitHub\football-betting-buddi"
Set-Location $root

# STATUS.md
@'
# STATUS — Football-Betting-Buddi
**Last updated:** 2025-11-04

## What we did today
- ✅ Created clean repo structure (`frontend/`, `backend/`, `scripts/`, `data/`, docs).
- ✅ Backend MVP: Express on **127.0.0.1:8081** with `GET /api/health`.
- ✅ Frontend MVP: Vite React TS on **http://localhost:3000** showing health JSON.
- ✅ One-command launcher: `.\dev.ps1` starts/stops both and opens browser.
- ✅ GitHub in sync: README rewritten with detailed plan; push working.

## Current dev environment
- **Frontend:** http://localhost:3000
- **Backend:** http://127.0.0.1:8081
- **Launcher:** `.\dev.ps1`  (`-Status`, `-Stop` supported)
- **Logs:** `logs/backend.log`, `logs/frontend.log`

## Known issues / blockers
- None critical. (Earlier `package.json` walk-up error fixed.)

---

## 📅 Tomorrow AM — Agenda (3 focused steps)
1. **Backend diagnostics endpoint**  
   Implement `GET /api/status` returning: api/version, ports, uptime, node info, and frontend reachability.
   - Acceptance: `curl http://127.0.0.1:8081/api/status` returns JSON with `frontend.reachable: true`.

2. **Frontend Status Card (Home page)**  
   Call `/api/status` and render a small card: API ok, Frontend ok/warn, uptime, versions.
   - Acceptance: card visible on `/`, badge turns green, no console errors.

3. **Tag & push**  
   Commit + tag `v0.0.1-mvp-skeleton` after both are green.
   - Acceptance: tag visible on GitHub; README/STATUS mention the new endpoint.

> Send me this exact line tomorrow to confirm start:  
> **“Start with Step 1: /api/status — then Status Card — then tag v0.0.1.”**
'@ | Set-Content -Path "STATUS.md" -Encoding UTF8

# ROADMAP.md
@'
# ROADMAP — Football-Betting-Buddi
**Last updated:** 2025-11-04

## Phase 1 — MVP Skeleton ✅ (today)
- Backend `/api/health`
- Frontend shell (Vite React TS)
- One-command launcher `dev.ps1`

## Phase 2 — Status & Diagnostics (tomorrow)
- `GET /api/status` (versions, uptime, frontend check)
- Frontend Status Card on `/`

## Phase 3 — Fixtures (next)
- `data/fixtures.json` seed
- `GET /api/fixtures`
- Fixtures list with date/league filters

## Phase 4 — Smart Bets (mock)
- Heuristic fair odds, EV, confidence colouring
- Rationale bullets

## Phase 5 — Persistence
- LocalStorage (MVP) → Postgres + Prisma later
- Save picks; P/L (singles & acca)

## Phase 6 — Auth
- Session/JWT; saved picks per user

## Phase 7 — Odds & Scheduler
- Odds ingestion
- Daily Smart Bets at 09:00 with audit trail

## Phase 8 — Admin & Audit
- Approvals, overrides, reasoning log

## Phase 9 — CI/CD
- Lint/test/build workflow; release tags
'@ | Set-Content -Path "ROADMAP.md" -Encoding UTF8

git add STATUS.md ROADMAP.md
git commit -m "docs: update STATUS (today vs tomorrow) and refresh ROADMAP"
git push
