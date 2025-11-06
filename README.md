<div align="center">

![Betopia Logo](https://client-uploads.nyc3.digitaloceanspaces.com/images/3c87493f-e2c3-415f-b470-51a2c8db8f55/2025-11-05T02-02-00-480Z-db09174a.jpg)

# ✨ Betopia

**AI-Powered Sports Betting Intelligence Platform**

> Your Betting Utopia - Transform sports data into actionable betting insights with transparent AI predictions, multi-market coverage, and confidence-ranked smart bets.

[![Status](https://img.shields.io/badge/status-MVP%20Development-yellow)](https://github.com/dannythehat/betopia)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

</div>

---

## 🎯 What is Betopia?

Betopia is an **AI-powered sports betting intelligence platform** that helps users make smarter, data-driven betting decisions across multiple markets and leagues worldwide.

### Core Value Proposition

- **🤖 Dual AI Strategy**: Batch-processed daily Smart Bets + on-demand market predictions
- **📊 Multi-Market Coverage**: 1X2, Over/Under, BTTS, Asian Handicap, Corners, Cards
- **🌍 Global Sports**: Football (Premier League, La Liga, Serie A, Bundesliga, Ligue 1), with cricket, tennis, basketball coming soon
- **🔍 Transparent Reasoning**: Natural language explanations with confidence scores
- **📈 Historical Tracking**: Performance validation and ROI analytics

---

## 🚀 Key Features

### For Users
- **Today's Smart Bets**: Highest-value AI tips generated daily via batch processing
- **On-Demand Predictions**: Request specific market analysis for any fixture
- **Personal Dashboard**: Track saved bets, view P/L, export historical data
- **Confidence Indicators**: Color-coded confidence levels with detailed reasoning
- **Responsible Gambling**: Built-in limits, disclaimers, and educational resources

### For Developers
- **Clean Architecture**: Node.js/Express backend, React frontend (Vite)
- **Scalable Data**: JSON caching → PostgreSQL migration path
- **AI Integration**: OpenAI GPT + probabilistic models
- **Automation**: GitHub Actions + Google Cloud Functions for batch jobs
- **API-First**: RESTful endpoints for fixtures, predictions, and user data

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React/Vite)                   │
│  • Today's Smart Bets  • Fixture Browser  • Dashboard      │
│  • Market Predictions  • Historical P/L   • User Settings  │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Node.js/Express)                 │
│  • /api/health        • /api/fixtures    • /api/smart-bets │
│  • /api/predictions   • /api/user/bets   • /api/auth       │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                    DATA & AI LAYER                          │
│  • API-Football (fixtures/odds)  • OpenAI GPT (reasoning)  │
│  • Batch Processing (daily)      • JSON Cache → Postgres   │
│  • GitHub Actions (automation)   • Cloud Functions (jobs)  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Current Status (MVP Phase)

### ✅ Completed
- [x] Repository structure and documentation
- [x] Backend Express API with health endpoint (`/api/health`)
- [x] Frontend React shell (Vite + TypeScript)
- [x] PowerShell launcher (`dev.ps1`) for local development
- [x] Logging infrastructure (`logs/backend.log`, `logs/frontend.log`)
- [x] AI-assisted workflow management system

### 🚧 In Progress
- [ ] `/api/status` diagnostics endpoint
- [ ] Frontend status card with health indicators
- [ ] Fixtures data schema and API endpoint

### 📋 Next Up
- [ ] Smart Bets JSON schema and mock data
- [ ] AI prediction pipeline (batch + on-demand)
- [ ] User dashboard with localStorage persistence

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|------------|
| **Frontend** | React, Vite, TypeScript | Modern UI with fast HMR |
| **Backend** | Node.js, Express | RESTful API server |
| **AI/ML** | OpenAI GPT, Custom Models | Predictions + reasoning |
| **Data** | API-Football, Web Scraping | Fixtures, odds, stats |
| **Storage** | JSON → PostgreSQL | Caching → persistent DB |
| **Automation** | GitHub Actions, Cloud Functions | Daily batch jobs |
| **Payments** | Stripe | Premium subscriptions |
| **Deployment** | TBD (Vercel/Railway/AWS) | Production hosting |

---

## 🎮 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ and npm
- PowerShell (Windows) or Bash (Linux/Mac)
- Git

### Installation

```powershell
# Clone repository
git clone https://github.com/dannythehat/betopia.git
cd betopia

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to root
cd ..
```

### Running the App

```powershell
# Start both backend and frontend
.\dev.ps1

# Check status
.\dev.ps1 -Status

# Stop all services
.\dev.ps1 -Stop
```

**Access Points:**
- Frontend: `http://localhost:3000`
- Backend: `http://127.0.0.1:8081`
- Health Check: `http://127.0.0.1:8081/api/health`

---

## 🤖 AI-Assisted Development Workflow

This project includes a **workflow management system** designed for AI-assisted development with OpenAI.

### Quick Start with AI

```powershell
# Get current project state for AI context
.\workflow.ps1 -Summary

# See what to work on next
.\workflow.ps1 -Next

# Start a task
.\workflow.ps1 -Start "2.1"

# Mark task complete
.\workflow.ps1 -Complete "2.1"
```

### Key Files for AI Development

- **`WORKFLOW_STATE.json`** - Machine-readable current state (source of truth)
- **`workflow.ps1`** - PowerShell script for workflow management
- **`AI_CONTEXT.md`** - Guide for OpenAI chat sessions
- **`DAILY_PLAN.md`** - Detailed daily task breakdown

### Daily Workflow with OpenAI

1. **Morning**: Run `.\workflow.ps1 -Summary` and paste output to OpenAI
2. **During Dev**: OpenAI helps with code, you test locally
3. **After Task**: Run `.\workflow.ps1 -Complete "X.X"` and commit
4. **Repeat**: Move to next task with `.\workflow.ps1 -Next`

**See [AI_CONTEXT.md](AI_CONTEXT.md) for complete guide**

---

## 📚 Documentation

- **[VISION.md](VISION.md)** - Long-term product vision and goals
- **[ROADMAP.md](ROADMAP.md)** - Development phases and milestones
- **[STATUS.md](STATUS.md)** - Current progress and daily updates
- **[DAILY_PLAN.md](DAILY_PLAN.md)** - Small-batch daily tasks for AI-assisted development
- **[AI_CONTEXT.md](AI_CONTEXT.md)** - Guide for OpenAI chat sessions
- **[WORKFLOW_STATE.json](WORKFLOW_STATE.json)** - Current workflow state (machine-readable)
- **[ABOUT.md](ABOUT.md)** - Project background and context

---

## 🎯 Supported Betting Markets

| Market | Description | Status |
|--------|-------------|--------|
| **1X2** | Home/Draw/Away | ✅ Planned |
| **Over/Under Goals** | Total goals (e.g., 2.5) | ✅ Planned |
| **BTTS** | Both Teams To Score | ✅ Planned |
| **Asian Handicap** | Handicap betting | ✅ Planned |
| **Corners** | Over/Under corners | ✅ Planned |
| **Cards** | Over/Under cards | ✅ Planned |
| **Correct Score** | Exact score prediction | 🔜 Future |
| **Double Chance** | Combined outcomes | 🔜 Future |

---

## 💼 Business Model

### Freemium Strategy
- **Free Tier**: Core smart bets, basic market predictions
- **Premium Tier** ($9.99/month): Enhanced tips, advanced analytics, API access, notifications

### Revenue Streams
1. **Subscriptions**: Recurring monthly/annual plans via Stripe
2. **Affiliate Partnerships**: Bookmaker referrals and commissions
3. **API Licensing**: White-label solutions for betting platforms
4. **Data Services**: Historical performance data for partners

---

## 🌍 Target Markets

### Phase 1: UK & EU
- Well-established regulatory frameworks
- GDPR compliance built-in
- UK Gambling Commission guidelines followed
- Affiliate marketing opportunities

### Phase 2: Global Expansion
- US market (state-by-state compliance)
- Asian markets (localization)
- Latin America (emerging betting markets)

---

## 🔒 Compliance & Responsible Gambling

### Legal Framework
- ✅ Explicit liability disclaimers throughout app
- ✅ Terms of Service stating predictions are informational only
- ✅ GDPR-compliant data handling
- ✅ Age verification and geo-blocking where required

### Responsible Gambling Features
- 🛡️ Betting limit recommendations
- 🛡️ Self-exclusion options
- 🛡️ Links to gambling support resources (GamCare, BeGambleAware)
- 🛡️ Clear risk warnings on all predictions

---

## 🏆 Competitive Advantages

1. **Dual AI Approach**: Batch consistency + on-demand flexibility
2. **Transparency**: Full reasoning explanations, not black-box predictions
3. **Multi-Market Depth**: Broader coverage than single-market competitors
4. **Historical Validation**: Audited performance tracking builds trust
5. **User Experience**: Clean UI with confidence visualization
6. **Scalable Architecture**: Built for growth from day one

---

## 📈 Development Roadmap

### Phase 1: MVP Foundation (Current)
- ✅ Repository setup and documentation
- ✅ AI-assisted workflow management
- 🚧 Backend API with health/status endpoints
- 🚧 Frontend shell with React/Vite
- 📋 Fixtures browser with filters
- 📋 Mock Smart Bets with heuristic model

### Phase 2: AI Integration (Weeks 5-8)
- OpenAI GPT integration for reasoning
- Batch processing pipeline (daily Smart Bets)
- On-demand prediction API
- Confidence scoring and visualization

### Phase 3: Data & Persistence (Weeks 9-12)
- API-Football integration
- PostgreSQL database setup
- User authentication (JWT)
- Dashboard with P/L tracking

### Phase 4: Premium Features (Weeks 13-16)
- Stripe subscription integration
- Enhanced analytics for premium users
- Email notifications and alerts
- API access for partners

### Phase 5: Scale & Optimize (Weeks 17-20)
- Performance optimization
- Mobile-responsive design
- CI/CD pipeline (GitHub Actions)
- Production deployment

---

## 🤝 Contributing

This is currently a private project under active development. Contributions will be welcomed once the MVP is stable.

### Development Workflow
1. Create feature branch from `main`
2. Make small, focused commits
3. Write clear commit messages
4. Test locally with `dev.ps1`
5. Submit PR with description

---

## 📞 Contact & Support

- **Developer**: Danny Allan
- **Email**: danqawsedef@gmail.com
- **GitHub**: [@dannythehat](https://github.com/dannythehat)
- **Repository**: [betopia](https://github.com/dannythehat/betopia)

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **API-Football** for comprehensive football data
- **OpenAI** for GPT-powered reasoning
- **React & Vite** for modern frontend tooling
- **Express.js** for robust backend framework

---

<div align="center">

**Built with ✨ and 🤖 by the Betopia team**

*Your Betting Utopia - Where Smart Bets Live*

</div>
