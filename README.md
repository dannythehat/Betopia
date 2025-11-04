# ⚽ Football-Betting-Buddi

AI-powered football betting assistant that aggregates fixtures, computes probabilities, and surfaces **Smart Bets** with transparent reasoning (EV/confidence). This repo is built for **fast iteration**: clean baseline now, add data + models incrementally.

---

## 1) Status (MVP)
- **Frontend:** Vite + React + TS → `http://localhost:3000`
- **Backend:** Express → `http://127.0.0.1:8081`
- **Health:** `GET /api/health` → `{ status: "ok" }`
- **Launcher:** `.\dev.ps1` starts/stops both; logs in `logs\`
- **DB:** none yet (MVP uses in-memory/static JSON)

---

## 2) Vision
A data-first, explainable betting companion:
- **Fixtures + Odds** with clean filters (league/date/market).
- **Smart Bets**: top value picks per day with EV and confidence bands.
- **Explainability**: why this bet? (price vs fair odds, form, market drift).
- **History & P/L**: track singles/accas, ROI by league/market.
- **Admin gate**: approve/override Smart Bets, audit model reasoning.

---

## 3) Scope by Phase (what we will build)

**Phase 1 — MVP Skeleton (Now)**
- Frontend shell + backend health ✅
- One-command launcher ✅

**Phase 2 — Status & Diagnostics (Next)**
- `GET /api/status`: versions, ports, uptime, frontend reachability
- Frontend status card (OK/warn badges)

**Phase 3 — Fixtures (Stub → Live)**
- Static JSON in `data/fixtures.json`
- List + filters (league/date), basic search

**Phase 4 — Smart Bets (Mock → Heuristic)**
- Mock model: fair odds from simple features
- EV, confidence, and short rationale

**Phase 5 — Persistence**
- LocalStorage (MVP) → Postgres + Prisma later
- Save picks, compute P/L (singles + acca)

**Phase 6 — Auth**
- Simple session/JWT for saved picks

**Phase 7 — Odds & Scheduler**
- Odds ingestion job
- Daily Smart Bets at 09:00 with audit trail

**Phase 8 — Admin & Audit**
- Approvals, overrides, full reasoning log

**Phase 9 — CI/CD**
- Lint/test/build GitHub Actions, release tags

---

## 4) Architecture (MVP → Later)

**Frontend (React/Vite/TS)**
- `/` Home: status + today’s fixtures (stub)
- `/smart-bets` Daily picks (stub list)
- `/dashboard` Saved bets, P/L (localStorage in MVP)
- **Axios** client → `http://127.0.0.1:8081/api`

**Backend (Express)**
- `/api/health` — readiness
- `/api/status` — diagnostics (next)
- `/api/fixtures` — serve static JSON (soon)
- (Later) `/api/smart-bets`, `/api/bets`, `/api/auth/*`

**Processes**
- `dev.ps1` orchestrates backend+frontend
- `logs\backend.log`, `logs\frontend.log`

**Ports**
- Frontend: **3000**
- Backend: **8081**
- Bind: `127.0.0.1` (local dev only)

---

## 5) Dev Quickstart
```powershell
cd C:\Users\Danny\Documents\GitHub\football-betting-buddi
.\dev.ps1         # start both
.\dev.ps1 -Status # show running jobs
.\dev.ps1 -Stop   # stop both
