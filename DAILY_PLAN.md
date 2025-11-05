# 📅 Daily Development Plan - FootballBettingBuddi

**AI + PowerShell Friendly Development Workflow**

> Small, focused daily tasks designed for AI-assisted development with PowerShell automation

---

## 🎯 How to Use This Plan

1. **Each day = 1-3 focused tasks** (2-4 hours total)
2. **PowerShell scripts provided** for quick execution
3. **Clear acceptance criteria** for each task
4. **Git commit after each completed task**
5. **AI-friendly**: Copy task description to your AI assistant

---

## 📊 Current Phase: MVP Foundation

**Goal**: Build working skeleton with health checks, fixtures, and mock Smart Bets

---

## Week 1: Core Infrastructure

### Day 1 ✅ (Completed 2025-11-04)
**Tasks:**
- [x] Repository structure setup
- [x] Backend Express API with `/api/health`
- [x] Frontend React shell (Vite + TypeScript)
- [x] PowerShell launcher (`dev.ps1`)

**Commit**: `feat: MVP skeleton with backend health endpoint and frontend shell`

---

### Day 2 (Today's Focus)

#### Task 2.1: Backend Status Endpoint
**Goal**: Create `/api/status` endpoint with diagnostics

**PowerShell Setup:**
```powershell
cd C:\Users\Danny\Documents\GitHub\football-betting-buddi\backend
code server.js
```

**Implementation Checklist:**
- [ ] Add `/api/status` route to `server.js`
- [ ] Return JSON with:
  - `api.version`: "0.0.1"
  - `api.port`: 8081
  - `api.uptime`: process uptime in seconds
  - `node.version`: Node.js version
  - `frontend.url`: "http://localhost:3000"
  - `frontend.reachable`: true/false (ping check)
- [ ] Test with: `curl http://127.0.0.1:8081/api/status`

**Acceptance Criteria:**
✅ Endpoint returns 200 status
✅ JSON includes all required fields
✅ Frontend reachability check works

**Commit Message:**
```powershell
git add backend/server.js
git commit -m "feat(backend): add /api/status diagnostics endpoint"
git push
```

---

#### Task 2.2: Frontend Status Card
**Goal**: Display backend health on homepage

**PowerShell Setup:**
```powershell
cd C:\Users\Danny\Documents\GitHub\football-betting-buddi\frontend
code app.js
```

**Implementation Checklist:**
- [ ] Create `StatusCard` component in `app.js`
- [ ] Fetch `/api/status` on component mount
- [ ] Display:
  - API Status: 🟢 OK / 🔴 Error
  - Frontend Status: 🟢 OK / 🟡 Warning
  - Uptime: X seconds
  - Version: 0.0.1
- [ ] Add CSS styling in `styles.css`

**Acceptance Criteria:**
✅ Card visible on homepage
✅ Green badges when healthy
✅ No console errors

**Commit Message:**
```powershell
git add frontend/app.js frontend/styles.css
git commit -m "feat(frontend): add status card with health indicators"
git push
```

---

#### Task 2.3: Version Tag
**Goal**: Tag MVP skeleton release

**PowerShell Commands:**
```powershell
cd C:\Users\Danny\Documents\GitHub\football-betting-buddi
git tag -a v0.0.1-mvp-skeleton -m "MVP skeleton with health checks and status endpoint"
git push origin v0.0.1-mvp-skeleton
```

**Update STATUS.md:**
```powershell
# Add to STATUS.md
"✅ v0.0.1-mvp-skeleton released (2025-11-05)"
```

**Acceptance Criteria:**
✅ Tag visible on GitHub
✅ STATUS.md updated

---

## Week 1: Fixtures & Data

### Day 3: Fixtures Schema & Mock Data

#### Task 3.1: Create Fixtures JSON Schema
**Goal**: Define fixture data structure

**PowerShell Setup:**
```powershell
cd C:\Users\Danny\Documents\GitHub\football-betting-buddi\data
New-Item -ItemType File -Name "fixtures-schema.json"
code fixtures-schema.json
```

**Schema Structure:**
```json
{
  "fixture_id": "string",
  "date": "ISO 8601 datetime",
  "league": "string",
  "home_team": "string",
  "away_team": "string",
  "status": "scheduled|live|finished",
  "odds": {
    "1X2": { "home": 2.1, "draw": 3.4, "away": 3.2 },
    "over_under_2_5": { "over": 1.85, "under": 2.0 },
    "btts": { "yes": 1.9, "no": 1.95 }
  }
}
```

**Acceptance Criteria:**
✅ Schema file created
✅ Includes all major markets
✅ Documented with comments

**Commit**: `feat(data): add fixtures JSON schema`

---

#### Task 3.2: Generate Mock Fixtures
**Goal**: Create sample fixtures for testing

**PowerShell Script:**
```powershell
cd C:\Users\Danny\Documents\GitHub\football-betting-buddi\data
New-Item -ItemType File -Name "fixtures.json"
# Populate with 10-15 mock fixtures
```

**Mock Data Requirements:**
- [ ] 10-15 fixtures across 3-4 leagues
- [ ] Mix of today, tomorrow, and next week
- [ ] Realistic odds for each market
- [ ] Include Premier League, La Liga, Serie A

**Acceptance Criteria:**
✅ Valid JSON format
✅ Follows schema structure
✅ Realistic team names and odds

**Commit**: `feat(data): add mock fixtures for testing`

---

#### Task 3.3: Backend Fixtures Endpoint
**Goal**: Serve fixtures via API

**PowerShell Setup:**
```powershell
cd C:\Users\Danny\Documents\GitHub\football-betting-buddi\backend
code server.js
```

**Implementation:**
- [ ] Add `GET /api/fixtures` route
- [ ] Read `../data/fixtures.json`
- [ ] Support query params:
  - `?league=Premier League`
  - `?date=2025-11-05`
  - `?status=scheduled`
- [ ] Return filtered fixtures array

**Test Command:**
```powershell
curl "http://127.0.0.1:8081/api/fixtures?league=Premier%20League"
```

**Acceptance Criteria:**
✅ Endpoint returns fixtures
✅ Filtering works correctly
✅ Handles errors gracefully

**Commit**: `feat(backend): add fixtures API endpoint with filtering`

---

### Day 4: Frontend Fixtures Browser

#### Task 4.1: Fixtures List Component
**Goal**: Display fixtures on frontend

**PowerShell Setup:**
```powershell
cd C:\Users\Danny\Documents\GitHub\football-betting-buddi\frontend
code app.js
```

**Implementation:**
- [ ] Create `FixturesList` component
- [ ] Fetch `/api/fixtures` on mount
- [ ] Display each fixture:
  - Date & time
  - League badge/name
  - Home vs Away teams
  - Key odds (1X2, O/U 2.5)
- [ ] Add loading state and error handling

**Acceptance Criteria:**
✅ Fixtures render correctly
✅ Loading spinner shows
✅ Error message if API fails

**Commit**: `feat(frontend): add fixtures list component`

---

#### Task 4.2: Fixtures Filters
**Goal**: Add league and date filters

**Implementation:**
- [ ] Add filter dropdowns above fixtures list
- [ ] League filter (All, Premier League, La Liga, etc.)
- [ ] Date filter (Today, Tomorrow, This Week, All)
- [ ] Update API call when filters change

**Acceptance Criteria:**
✅ Filters update fixtures list
✅ URL params reflect filters
✅ Smooth UX (no flicker)

**Commit**: `feat(frontend): add fixtures filtering by league and date`

---

#### Task 4.3: Fixture Detail View
**Goal**: Click fixture to see details

**Implementation:**
- [ ] Make fixture cards clickable
- [ ] Show expanded view with:
  - All available markets
  - Team stats (mock for now)
  - "Get AI Prediction" button (placeholder)
- [ ] Add close button

**Acceptance Criteria:**
✅ Detail view opens on click
✅ All markets displayed
✅ Close button works

**Commit**: `feat(frontend): add fixture detail view with markets`

---

## Week 2: Smart Bets Foundation

### Day 5: Smart Bets Schema

#### Task 5.1: Smart Bets JSON Schema
**Goal**: Define Smart Bet data structure

**PowerShell Setup:**
```powershell
cd C:\Users\Danny\Documents\GitHub\football-betting-buddi\data
New-Item -ItemType File -Name "smart-bets-schema.json"
code smart-bets-schema.json
```

**Schema Structure:**
```json
{
  "bet_id": "string",
  "fixture_id": "string",
  "market": "1X2|over_under_2_5|btts|etc",
  "selection": "string",
  "confidence": "high|medium|low",
  "confidence_score": 0.85,
  "fair_odds": 2.1,
  "bookmaker_odds": 2.3,
  "expected_value": 0.095,
  "reasoning": ["bullet 1", "bullet 2", "bullet 3"],
  "generated_at": "ISO 8601 datetime"
}
```

**Acceptance Criteria:**
✅ Schema documented
✅ Includes EV calculation fields
✅ Reasoning structure defined

**Commit**: `feat(data): add smart bets JSON schema`

---

#### Task 5.2: Mock Smart Bets Generator
**Goal**: Create sample Smart Bets

**PowerShell Script:**
```powershell
cd C:\Users\Danny\Documents\GitHub\football-betting-buddi\scripts
New-Item -ItemType File -Name "generate-mock-smart-bets.js"
code generate-mock-smart-bets.js
```

**Script Requirements:**
- [ ] Read fixtures from `data/fixtures.json`
- [ ] Generate 3-5 Smart Bets per day
- [ ] Calculate mock EV (5-15% range)
- [ ] Add realistic reasoning bullets
- [ ] Save to `data/smart-bets-daily.json`

**Run Command:**
```powershell
node scripts/generate-mock-smart-bets.js
```

**Acceptance Criteria:**
✅ Script generates valid Smart Bets
✅ Output matches schema
✅ Reasoning is coherent

**Commit**: `feat(scripts): add mock smart bets generator`

---

#### Task 5.3: Backend Smart Bets Endpoint
**Goal**: Serve Smart Bets via API

**Implementation:**
- [ ] Add `GET /api/smart-bets` route
- [ ] Read `../data/smart-bets-daily.json`
- [ ] Support query params:
  - `?date=2025-11-05`
  - `?confidence=high`
- [ ] Return sorted by EV (highest first)

**Test Command:**
```powershell
curl "http://127.0.0.1:8081/api/smart-bets?confidence=high"
```

**Acceptance Criteria:**
✅ Endpoint returns Smart Bets
✅ Sorting works correctly
✅ Filtering by confidence works

**Commit**: `feat(backend): add smart bets API endpoint`

---

### Day 6: Frontend Smart Bets Display

#### Task 6.1: Smart Bets Card Component
**Goal**: Display today's Smart Bets on homepage

**Implementation:**
- [ ] Create `SmartBetsCard` component
- [ ] Fetch `/api/smart-bets` for today
- [ ] Display each bet:
  - Fixture (teams)
  - Market & selection
  - Confidence badge (color-coded)
  - EV percentage
  - Reasoning bullets (collapsible)
- [ ] Add "View All" link

**Acceptance Criteria:**
✅ Smart Bets render on homepage
✅ Confidence colors correct (green/yellow/orange)
✅ Reasoning expands on click

**Commit**: `feat(frontend): add smart bets card to homepage`

---

#### Task 6.2: Smart Bets Page
**Goal**: Dedicated page for all Smart Bets

**Implementation:**
- [ ] Create `/smart-bets` route
- [ ] Show all Smart Bets (not just today)
- [ ] Add filters:
  - Date range
  - Confidence level
  - Market type
- [ ] Add sorting options (EV, confidence, date)

**Acceptance Criteria:**
✅ Page accessible via navigation
✅ Filters work correctly
✅ Sorting updates list

**Commit**: `feat(frontend): add dedicated smart bets page with filters`

---

#### Task 6.3: Add to Dashboard Button
**Goal**: Let users save Smart Bets

**Implementation:**
- [ ] Add "Add to Dashboard" button on each Smart Bet
- [ ] Save to localStorage (key: `saved_bets`)
- [ ] Show confirmation toast
- [ ] Disable button if already saved

**Acceptance Criteria:**
✅ Button saves bet to localStorage
✅ Toast notification appears
✅ Button state updates correctly

**Commit**: `feat(frontend): add save to dashboard functionality`

---

## Week 3: User Dashboard

### Day 7: Dashboard Foundation

#### Task 7.1: Dashboard Page Structure
**Goal**: Create user dashboard layout

**Implementation:**
- [ ] Create `/dashboard` route
- [ ] Layout sections:
  - Saved Bets (pending)
  - Completed Bets (with results)
  - P/L Summary
  - Export button
- [ ] Load saved bets from localStorage

**Acceptance Criteria:**
✅ Dashboard page accessible
✅ Layout sections visible
✅ Saved bets load correctly

**Commit**: `feat(frontend): add dashboard page structure`

---

#### Task 7.2: Saved Bets Display
**Goal**: Show user's saved bets

**Implementation:**
- [ ] Display saved bets in table/cards
- [ ] Show:
  - Fixture details
  - Market & selection
  - Odds at time of save
  - Status (pending/won/lost)
- [ ] Add remove button

**Acceptance Criteria:**
✅ Saved bets render correctly
✅ Remove button works
✅ Empty state message

**Commit**: `feat(frontend): display saved bets on dashboard`

---

#### Task 7.3: Mock Results Update
**Goal**: Simulate bet results

**PowerShell Script:**
```powershell
cd C:\Users\Danny\Documents\GitHub\football-betting-buddi\scripts
New-Item -ItemType File -Name "update-mock-results.js"
code update-mock-results.js
```

**Script Requirements:**
- [ ] Read saved bets from localStorage
- [ ] Randomly assign win/loss (60% win rate)
- [ ] Update bet status
- [ ] Calculate P/L

**Acceptance Criteria:**
✅ Script updates bet statuses
✅ P/L calculated correctly
✅ Results persist in localStorage

**Commit**: `feat(scripts): add mock results updater`

---

### Day 8: P/L Tracking

#### Task 8.1: P/L Summary Component
**Goal**: Show profit/loss overview

**Implementation:**
- [ ] Calculate total P/L from completed bets
- [ ] Display:
  - Total bets placed
  - Win rate %
  - Total profit/loss
  - ROI %
- [ ] Color-code (green profit, red loss)

**Acceptance Criteria:**
✅ Summary displays correctly
✅ Calculations accurate
✅ Colors update based on P/L

**Commit**: `feat(frontend): add P/L summary to dashboard`

---

#### Task 8.2: P/L Chart
**Goal**: Visualize P/L over time

**Implementation:**
- [ ] Install chart library (Chart.js or Recharts)
- [ ] Create line chart showing cumulative P/L
- [ ] X-axis: Date
- [ ] Y-axis: Profit/Loss
- [ ] Add hover tooltips

**PowerShell Install:**
```powershell
cd C:\Users\Danny\Documents\GitHub\football-betting-buddi\frontend
npm install chart.js react-chartjs-2
```

**Acceptance Criteria:**
✅ Chart renders correctly
✅ Data updates dynamically
✅ Tooltips show details

**Commit**: `feat(frontend): add P/L chart to dashboard`

---

#### Task 8.3: Export Functionality
**Goal**: Export bet history to CSV

**Implementation:**
- [ ] Add "Export CSV" button
- [ ] Generate CSV from saved bets
- [ ] Include columns:
  - Date, Fixture, Market, Selection, Odds, Status, P/L
- [ ] Trigger download

**Acceptance Criteria:**
✅ Button triggers CSV download
✅ CSV format correct
✅ All data included

**Commit**: `feat(frontend): add CSV export for bet history`

---

## Week 4: AI Integration Prep

### Day 9: AI Prediction Schema

#### Task 9.1: Prediction Request Schema
**Goal**: Define AI prediction input/output

**PowerShell Setup:**
```powershell
cd C:\Users\Danny\Documents\GitHub\football-betting-buddi\data
New-Item -ItemType File -Name "prediction-schema.json"
code prediction-schema.json
```

**Schema Structure:**
```json
{
  "request": {
    "fixture_id": "string",
    "market": "string",
    "context": {
      "home_form": [],
      "away_form": [],
      "head_to_head": [],
      "odds": {}
    }
  },
  "response": {
    "prediction": "string",
    "probability": 0.65,
    "confidence": "high|medium|low",
    "reasoning": ["bullet 1", "bullet 2"],
    "fair_odds": 2.1,
    "expected_value": 0.095
  }
}
```

**Acceptance Criteria:**
✅ Schema documented
✅ Request/response structure clear
✅ Context fields defined

**Commit**: `feat(data): add AI prediction schema`

---

#### Task 9.2: Mock AI Prediction Function
**Goal**: Simulate AI predictions

**PowerShell Setup:**
```powershell
cd C:\Users\Danny\Documents\GitHub\football-betting-buddi\backend
New-Item -ItemType File -Name "ai-predictor.js"
code ai-predictor.js
```

**Implementation:**
- [ ] Create `generatePrediction(fixture, market)` function
- [ ] Use heuristic rules (for now):
  - Home advantage: +10% win probability
  - Recent form: adjust by ±5%
  - Odds-based probability
- [ ] Generate reasoning bullets
- [ ] Calculate EV

**Acceptance Criteria:**
✅ Function returns valid prediction
✅ Reasoning is coherent
✅ EV calculation correct

**Commit**: `feat(backend): add mock AI prediction function`

---

#### Task 9.3: On-Demand Prediction Endpoint
**Goal**: API for user-requested predictions

**Implementation:**
- [ ] Add `POST /api/predictions` route
- [ ] Accept JSON body:
  ```json
  {
    "fixture_id": "abc123",
    "market": "over_under_2_5"
  }
  ```
- [ ] Call `generatePrediction()` function
- [ ] Return prediction JSON

**Test Command:**
```powershell
curl -X POST http://127.0.0.1:8081/api/predictions `
  -H "Content-Type: application/json" `
  -d '{"fixture_id":"abc123","market":"over_under_2_5"}'
```

**Acceptance Criteria:**
✅ Endpoint accepts POST requests
✅ Returns valid prediction
✅ Error handling works

**Commit**: `feat(backend): add on-demand prediction API endpoint`

---

### Day 10: Frontend Prediction UI

#### Task 10.1: Prediction Button on Fixtures
**Goal**: Add "Get AI Prediction" button

**Implementation:**
- [ ] Add button to fixture detail view
- [ ] Show market selector dropdown
- [ ] On click:
  - Show loading spinner
  - Call `/api/predictions`
  - Display prediction modal

**Acceptance Criteria:**
✅ Button triggers prediction request
✅ Loading state shows
✅ Modal displays prediction

**Commit**: `feat(frontend): add AI prediction button to fixtures`

---

#### Task 10.2: Prediction Modal Component
**Goal**: Display prediction results

**Implementation:**
- [ ] Create modal component
- [ ] Display:
  - Prediction (e.g., "Over 2.5 Goals")
  - Confidence badge
  - Probability %
  - Fair odds vs bookmaker odds
  - EV %
  - Reasoning bullets
- [ ] Add "Add to Dashboard" button
- [ ] Add close button

**Acceptance Criteria:**
✅ Modal renders correctly
✅ All data displayed
✅ Buttons work

**Commit**: `feat(frontend): add prediction modal component`

---

#### Task 10.3: Prediction History
**Goal**: Track user's prediction requests

**Implementation:**
- [ ] Save prediction requests to localStorage
- [ ] Add "Prediction History" section to dashboard
- [ ] Display:
  - Date/time of request
  - Fixture
  - Market
  - Prediction
  - Actual result (if available)

**Acceptance Criteria:**
✅ Predictions saved to localStorage
✅ History displays on dashboard
✅ Results update when available

**Commit**: `feat(frontend): add prediction history to dashboard`

---

## 🎯 Daily Workflow Template

**Copy this for each day:**

```powershell
# Morning Setup
cd C:\Users\Danny\Documents\GitHub\football-betting-buddi
git pull origin main
.\dev.ps1

# Work on tasks (see daily plan above)
# ... implement features ...

# Test locally
# ... verify functionality ...

# Commit and push
git add .
git commit -m "feat: [description of what you built]"
git push origin main

# Update STATUS.md
# Add completed tasks to STATUS.md

# End of day
.\dev.ps1 -Stop
```

---

## 📝 Commit Message Conventions

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

**Examples:**
- `feat(backend): add fixtures API endpoint`
- `feat(frontend): add smart bets card to homepage`
- `fix(backend): handle missing fixture data gracefully`
- `docs: update README with new features`

---

## 🚀 PowerShell Helper Scripts

### Quick Test Script
```powershell
# test-api.ps1
$baseUrl = "http://127.0.0.1:8081"

Write-Host "Testing /api/health..." -ForegroundColor Cyan
curl "$baseUrl/api/health"

Write-Host "`nTesting /api/status..." -ForegroundColor Cyan
curl "$baseUrl/api/status"

Write-Host "`nTesting /api/fixtures..." -ForegroundColor Cyan
curl "$baseUrl/api/fixtures"

Write-Host "`nTesting /api/smart-bets..." -ForegroundColor Cyan
curl "$baseUrl/api/smart-bets"
```

### Quick Commit Script
```powershell
# commit.ps1
param(
    [Parameter(Mandatory=$true)]
    [string]$Message
)

git add .
git commit -m $Message
git push origin main
Write-Host "✅ Committed and pushed: $Message" -ForegroundColor Green
```

**Usage:**
```powershell
.\commit.ps1 "feat(backend): add fixtures endpoint"
```

---

## 📊 Progress Tracking

Update this section daily:

### Week 1 Progress
- [x] Day 1: MVP skeleton ✅
- [ ] Day 2: Status endpoint & card
- [ ] Day 3: Fixtures schema & mock data
- [ ] Day 4: Fixtures browser

### Week 2 Progress
- [ ] Day 5: Smart Bets schema
- [ ] Day 6: Smart Bets display
- [ ] Day 7: Dashboard foundation
- [ ] Day 8: P/L tracking

### Week 3 Progress
- [ ] Day 9: AI prediction schema
- [ ] Day 10: Prediction UI

---

## 🎓 AI Assistant Prompts

**Copy these to your AI assistant for each task:**

### For Backend Tasks:
```
I'm working on FootballBettingBuddi, a football betting intelligence platform.

Current task: [Task name from daily plan]

Tech stack: Node.js, Express

Please help me:
1. [Specific implementation request]
2. Include error handling
3. Follow RESTful conventions
4. Add comments for clarity

File to modify: backend/server.js
```

### For Frontend Tasks:
```
I'm working on FootballBettingBuddi, a football betting intelligence platform.

Current task: [Task name from daily plan]

Tech stack: React, Vite, TypeScript

Please help me:
1. [Specific implementation request]
2. Use functional components with hooks
3. Include loading and error states
4. Follow React best practices

File to modify: frontend/app.js
```

---

**Last Updated**: 2025-11-05
**Current Phase**: Week 1 - Core Infrastructure
**Next Milestone**: v0.0.1-mvp-skeleton tag