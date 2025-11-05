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
