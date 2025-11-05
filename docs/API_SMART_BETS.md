# 📡 Smart Bets API Documentation

**Endpoint**: `/api/smart-bets`  
**Method**: `GET`  
**Version**: Enhanced with Precision Analytics

---

## 🎯 Overview

The Smart Bets API provides access to AI-generated betting recommendations with advanced filtering, sorting, and analytics capabilities. Every response includes precision metrics to help users make informed decisions.

---

## 📋 Query Parameters

### Filtering Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `date` | string | Specific date (YYYY-MM-DD format) | `?date=2025-11-05` |
| `confidence` | string | Filter by confidence color | `?confidence=green` |
| `market` | string | Filter by market type | `?market=Over/Under` |
| `league` | string | Filter by league name (partial match) | `?league=Premier` |
| `minProb` | float | Minimum probability threshold (0-1) | `?minProb=0.65` |
| `minEV` | float | Minimum Expected Value | `?minEV=0.1` |
| `status` | string | Filter by bet status | `?status=pending` |
| `team` | string | Filter by team name (home or away) | `?team=Arsenal` |

### Sorting Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `sort` | string | Sort field | `?sort=probability` |
| `order` | string | Sort order (`asc` or `desc`) | `?order=desc` |

**Sort Options**:
- `probability` - Sort by probability (default: desc)
- `ev` - Sort by Expected Value
- `odds` - Sort by odds
- `kickoff` - Sort by kickoff time

---

## 📊 Response Structure

### Success Response (200 OK)

```json
{
  "status": "ok",
  "date": "2025-11-05",
  "generated_at": "2025-11-05T01:11:00Z",
  "filters_applied": {
    "confidence": "green",
    "market": "all",
    "league": "all",
    "minProb": "0.65",
    "minEV": "none",
    "status": "all"
  },
  "summary": {
    "total_bets": 6,
    "confidence_distribution": {
      "green": 6,
      "yellow": 0,
      "red": 0
    },
    "market_distribution": {
      "Over/Under": 4,
      "BTTS": 2
    },
    "avg_probability": "0.703",
    "avg_ev": "0.238",
    "avg_odds": "1.76",
    "leagues": ["Premier League", "La Liga", "Bundesliga"],
    "date_range": {
      "earliest": "2025-11-08T15:00:00Z",
      "latest": "2025-11-10T20:00:00Z"
    }
  },
  "bets": [
    {
      "id": "SB-20251105-A7F3C2E1",
      "fixture_id": 1,
      "league": {
        "id": 39,
        "name": "Premier League",
        "country": "England",
        "season": 2025,
        "round": "Regular Season - 12"
      },
      "home": "Manchester City",
      "away": "Arsenal",
      "kickoff_utc": "2025-11-08T15:00:00Z",
      "market": "Over/Under",
      "market_params": {
        "line": 2.5
      },
      "pick": "Over 2.5",
      "probability": 0.72,
      "confidence_color": "green",
      "odds": 1.85,
      "ev": 0.33,
      "stake": 10,
      "ai_reasoning": "Both teams averaging 2.8 goals per game in last 5 matches",
      "status": "pending",
      "result_value": null,
      "settled_at_utc": null,
      "tags": ["SmartBet", "Generated"]
    }
  ]
}
```

### Error Response (404 Not Found)

```json
{
  "status": "error",
  "message": "No smartbets file for 2025-11-05. Available dates may differ.",
  "date": "2025-11-05"
}
```

### Error Response (500 Internal Server Error)

```json
{
  "status": "error",
  "message": "Failed to load smart bets."
}
```

---

## 🎯 Usage Examples

### 1. Get All Bets for Today

```bash
curl http://127.0.0.1:8081/api/smart-bets
```

### 2. Get High Confidence Bets Only

```bash
curl "http://127.0.0.1:8081/api/smart-bets?confidence=green"
```

### 3. Get Over/Under Bets with High Probability

```bash
curl "http://127.0.0.1:8081/api/smart-bets?market=Over/Under&minProb=0.65"
```

### 4. Get Premier League Bets Sorted by EV

```bash
curl "http://127.0.0.1:8081/api/smart-bets?league=Premier&sort=ev"
```

### 5. Get Value Bets (High EV)

```bash
curl "http://127.0.0.1:8081/api/smart-bets?minEV=0.2&sort=ev"
```

### 6. Get Bets for Specific Date

```bash
curl "http://127.0.0.1:8081/api/smart-bets?date=2025-11-05"
```

### 7. Complex Filter: High Confidence BTTS in Top Leagues

```bash
curl "http://127.0.0.1:8081/api/smart-bets?confidence=green&market=BTTS&minProb=0.65&sort=probability"
```

### 8. Get Bets for Specific Team

```bash
curl "http://127.0.0.1:8081/api/smart-bets?team=Arsenal"
```

---

## 📈 Summary Analytics Explained

### Confidence Distribution
Shows the breakdown of bets by confidence level:
- **Green**: High confidence (≥65% probability)
- **Yellow**: Medium confidence (55-64% probability)
- **Red**: Lower confidence (50-54% probability)

### Market Distribution
Shows how many bets are in each market type (Over/Under, BTTS, 1X2, etc.)

### Average Probability
The mean probability across all filtered bets. Higher is better.

### Average Expected Value (EV)
The mean EV across all bets. Positive EV indicates value bets.

**EV Formula**: `(probability × odds) - (1 - probability)`

### Average Odds
The mean decimal odds across all bets.

### Leagues
List of unique leagues represented in the filtered bets.

### Date Range
The earliest and latest kickoff times in the filtered bets.

---

## 🎓 Best Practices

### For Maximum Precision

1. **Filter by High Confidence**:
   ```bash
   ?confidence=green&minProb=0.65
   ```

2. **Focus on Value Bets**:
   ```bash
   ?minEV=0.15&sort=ev
   ```

3. **Combine Multiple Filters**:
   ```bash
   ?confidence=green&market=Over/Under&league=Premier&minEV=0.1
   ```

### For Diversification

1. **Mix Confidence Levels**:
   ```bash
   # Get all bets, sorted by probability
   ?sort=probability
   ```

2. **Multiple Markets**:
   ```bash
   # Don't filter by market to see all types
   ?confidence=green
   ```

### For Specific Strategies

1. **Over/Under Strategy**:
   ```bash
   ?market=Over/Under&minProb=0.65&sort=ev
   ```

2. **BTTS Strategy**:
   ```bash
   ?market=BTTS&confidence=green&sort=probability
   ```

3. **League-Specific**:
   ```bash
   ?league=Premier&confidence=green&minEV=0.1
   ```

---

## 🔧 Integration Examples

### JavaScript (Frontend)

```javascript
async function loadSmartBets(filters = {}) {
  const params = new URLSearchParams(filters);
  const response = await fetch(`/api/smart-bets?${params}`);
  const data = await response.json();
  
  if (data.status === 'ok') {
    console.log(`Loaded ${data.summary.total_bets} bets`);
    console.log(`Avg Probability: ${data.summary.avg_probability}`);
    console.log(`Avg EV: ${data.summary.avg_ev}`);
    return data.bets;
  } else {
    throw new Error(data.message);
  }
}

// Usage
const highConfidenceBets = await loadSmartBets({
  confidence: 'green',
  minProb: 0.65,
  sort: 'ev'
});
```

### Python

```python
import requests

def get_smart_bets(filters=None):
    url = "http://127.0.0.1:8081/api/smart-bets"
    response = requests.get(url, params=filters)
    data = response.json()
    
    if data['status'] == 'ok':
        print(f"Loaded {data['summary']['total_bets']} bets")
        print(f"Avg Probability: {data['summary']['avg_probability']}")
        print(f"Avg EV: {data['summary']['avg_ev']}")
        return data['bets']
    else:
        raise Exception(data['message'])

# Usage
high_value_bets = get_smart_bets({
    'minEV': 0.2,
    'confidence': 'green',
    'sort': 'ev'
})
```

### Node.js

```javascript
const axios = require('axios');

async function getSmartBets(filters = {}) {
  const response = await axios.get('http://127.0.0.1:8081/api/smart-bets', {
    params: filters
  });
  
  const data = response.data;
  
  if (data.status === 'ok') {
    console.log(`Loaded ${data.summary.total_bets} bets`);
    console.log(`Avg Probability: ${data.summary.avg_probability}`);
    console.log(`Avg EV: ${data.summary.avg_ev}`);
    return data.bets;
  } else {
    throw new Error(data.message);
  }
}

// Usage
(async () => {
  const premierLeagueBets = await getSmartBets({
    league: 'Premier',
    confidence: 'green',
    minProb: 0.65
  });
})();
```

---

## 🚀 Performance Tips

1. **Use Specific Filters**: Narrow down results to reduce response size
2. **Cache Responses**: Smart bets don't change frequently for a given date
3. **Pagination**: For large result sets, consider implementing pagination
4. **Compression**: Enable gzip compression for API responses

---

## 📝 Notes

- Default date is today (Europe/Sofia timezone)
- All probabilities are in decimal format (0-1)
- All odds are in decimal format
- Kickoff times are in UTC
- EV can be negative (indicates poor value)
- Summary statistics are calculated after filtering

---

## 🔗 Related Endpoints

- `/api/fixtures` - Get fixture data
- `/api/pl/compute` - Calculate profit/loss
- `/api/health` - API health check

---

**Last Updated**: 2025-11-05  
**API Version**: v0.0.3-smart-bets (pending)
