# 🛠️ Scripts Directory

Automation scripts for FootballBettingBuddi development and data generation.

---

## 📜 Available Scripts

### `generate-smart-bets.js`
**Purpose**: Generate daily Smart Bets from fixtures with AI-powered reasoning

**Usage**:
```bash
# Generate for today
node scripts/generate-smart-bets.js

# Generate for specific date
node scripts/generate-smart-bets.js 2025-11-05
```

**Features**:
- ✅ Analyzes fixtures from `data/mock-fixtures.json`
- ✅ Selects best betting markets (Over/Under, BTTS, 1X2, Asian Handicap)
- ✅ Calculates probability and Expected Value (EV)
- ✅ Generates AI reasoning for each pick
- ✅ Assigns confidence colors (green/yellow/red)
- ✅ Outputs to `data/smartbets-{date}.json`

**Output Example**:
```
🎯 Generating Smart Bets for 2025-11-05...
✅ Generated 8 Smart Bets
📁 Saved to: data/smartbets-2025-11-05.json

📊 Summary:
   Green (High): 6
   Yellow (Med): 2
   Red (Low): 0

🎲 Sample Bets:
   Manchester City vs Arsenal
   → Over/Under: Over 2.5 (72% - green)
   → Both teams averaging 2.8 goals per game in last 5 matches
```

**Configuration**:
- `CONFIDENCE_THRESHOLDS`: Probability thresholds for color coding
- `MARKETS`: Supported betting markets
- `REASONING_TEMPLATES`: AI reasoning templates per market
- `maxBets`: Maximum number of bets to generate (default: 8)

---

### `update-mock-results.js`
**Purpose**: Generate mock bet results for testing dashboard P/L tracking

**Usage**:
```bash
# Generate with default 55% win rate
node scripts/update-mock-results.js

# Generate with custom win rate
node scripts/update-mock-results.js --win-rate=0.6
```

**Features**:
- ✅ Generates realistic bet outcomes (won/lost/void)
- ✅ Probability-weighted results (higher probability bets win more often)
- ✅ Configurable win rate (default: 55%)
- ✅ Calculates P/L and ROI
- ✅ Outputs to `data/mock-results.json`
- ✅ Creates browser-ready script (`data/load-mock-results.js`)

**Output Example**:
```
🎲 Mock Results Update Script
================================

Target Win Rate: 55%

📊 Results Summary:
-------------------
Total Bets: 5
Pending: 1
Won: 2 ✅
Lost: 2 ❌
Void: 0 ⚪

Actual Win Rate: 50.0%
Total P/L: £0.50 📈
ROI: 1.3%

✅ Mock results saved to: data/mock-results.json
✅ Browser script saved to: data/load-mock-results.js
```

**How to Use Results**:
1. Run the script to generate mock results
2. Open browser console on dashboard page
3. Copy contents of `data/load-mock-results.js`
4. Paste into console and press Enter
5. Refresh the page to see updated P/L

**Configuration**:
- `WIN_RATE`: Target win rate (0-1, default: 0.55)
- `stake`: Bet stake amount (default: £10)

---

## 🔧 Development Scripts

### PowerShell Launcher (`dev.ps1`)
Located in root directory. Starts backend server.

```powershell
.\dev.ps1
```

---

## 📝 Adding New Scripts

1. Create script in `scripts/` directory
2. Add shebang: `#!/usr/bin/env node`
3. Document in this README
4. Make executable: `chmod +x scripts/your-script.js`
5. Test thoroughly before committing

---

## 🎯 Planned Scripts

- [x] `generate-smart-bets.js` - Generate daily Smart Bets ✅
- [x] `update-mock-results.js` - Generate mock bet results ✅
- [ ] `update-results.js` - Fetch real match results and settle bets
- [ ] `calculate-pl.js` - Calculate profit/loss for date range
- [ ] `export-csv.js` - Export bets to CSV format
- [ ] `validate-data.js` - Validate JSON schemas
- [ ] `backup-data.js` - Backup data files to archive

---

## 📚 Dependencies

All scripts use Node.js built-in modules:
- `fs` - File system operations
- `path` - Path manipulation
- `crypto` - ID generation

No external dependencies required for MVP phase.

---

## 🐛 Troubleshooting

**Script not found**:
```bash
# Ensure you're in project root
cd /path/to/football-betting-buddi
node scripts/generate-smart-bets.js
```

**Permission denied**:
```bash
chmod +x scripts/*.js
```

**Module not found**:
```bash
# Ensure Node.js is installed
node --version  # Should be v16+
```

---

## 📖 Related Documentation

- [DAILY_PLAN.md](../DAILY_PLAN.md) - Development workflow
- [AI_CONTEXT.md](../AI_CONTEXT.md) - AI workflow guide
- [QUICKREF.md](../QUICKREF.md) - Quick reference card
- [WEEK2_DAY7_SUMMARY.md](../docs/WEEK2_DAY7_SUMMARY.md) - Day 7 completion summary
