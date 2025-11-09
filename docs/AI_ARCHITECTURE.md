# 🤖 AI Architecture - Betopia

**AI-Powered Betting Intelligence System**

> Comprehensive architecture for integrating AI models into Betopia's prediction engine

---

## 📊 System Overview

Betopia's AI system transforms raw football data into actionable betting intelligence through a multi-layered architecture combining data ingestion, feature engineering, AI prediction, and performance tracking.

### Core Principles
1. **Modularity**: Pluggable AI models and data sources
2. **Scalability**: Handle 1000+ predictions/day
3. **Reliability**: 99.9% uptime with fallback systems
4. **Cost-Efficiency**: Optimized API usage
5. **Transparency**: Explainable predictions with reasoning

---

## 🏗️ Architecture Layers

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Layer                        │
│  (React UI, Prediction Display, User Interactions)      │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                     API Layer                            │
│  (Express REST API, Authentication, Rate Limiting)      │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                 Prediction Engine                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Context    │  │  AI Model    │  │ Post-Process │ │
│  │   Builder    │→ │  Interface   │→ │   & Score    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                   Data Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  PostgreSQL  │  │    Redis     │  │ API-Football │ │
│  │   Database   │  │    Cache     │  │     API      │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### 1. Prediction Request Flow
```
User Request
    ↓
API Gateway (Auth + Rate Limit)
    ↓
Prediction Controller
    ↓
Context Builder (Fetch Match Data)
    ↓
Feature Engineering (Transform Data)
    ↓
AI Model Interface (Select Model)
    ↓
Prompt Builder (Construct Prompt)
    ↓
AI Provider (OpenAI/Claude/Gemini)
    ↓
Response Parser (Extract Prediction)
    ↓
Confidence Scorer (Calculate Confidence)
    ↓
EV Calculator (Expected Value)
    ↓
Database Storage (Save Prediction)
    ↓
API Response (Return to User)
```

### 2. Batch Processing Flow
```
Scheduler (Daily 6 AM UTC)
    ↓
Fetch Today's Fixtures
    ↓
For Each Fixture:
    ↓
    Context Builder
    ↓
    AI Prediction
    ↓
    Store Result
    ↓
Generate Smart Bets JSON
    ↓
Update Cache
    ↓
Send Notifications (Premium Users)
```

---

## 🧩 Core Components

### 1. Context Builder
**Purpose**: Aggregate all relevant data for AI prediction

**Inputs**:
- Fixture ID
- Requested markets
- User preferences (optional)

**Process**:
1. Fetch fixture details (teams, date, venue)
2. Retrieve team form (last 10 matches)
3. Get head-to-head history
4. Fetch current odds
5. Check injury reports
6. Analyze team statistics
7. Consider external factors (weather, motivation)

**Output**:
```json
{
  "fixture": {
    "id": "12345",
    "date": "2025-11-09T15:00:00Z",
    "league": "Premier League",
    "home_team": "Arsenal",
    "away_team": "Chelsea",
    "venue": "Emirates Stadium"
  },
  "form": {
    "home": {
      "last_5": ["W", "W", "D", "W", "L"],
      "goals_scored": 12,
      "goals_conceded": 5,
      "xG": 10.5
    },
    "away": {
      "last_5": ["L", "W", "W", "D", "W"],
      "goals_scored": 9,
      "goals_conceded": 7,
      "xG": 8.2
    }
  },
  "head_to_head": {
    "total_matches": 10,
    "home_wins": 4,
    "draws": 3,
    "away_wins": 3,
    "avg_goals": 2.8
  },
  "odds": {
    "1X2": {"home": 2.10, "draw": 3.40, "away": 3.20},
    "over_under_2_5": {"over": 1.85, "under": 2.00}
  },
  "injuries": {
    "home": ["Player A (midfielder)"],
    "away": []
  }
}
```

---

### 2. AI Model Interface
**Purpose**: Abstract layer for different AI providers

**Supported Models**:
- OpenAI GPT-4 / GPT-4 Turbo
- Anthropic Claude 3 Opus / Sonnet
- Google Gemini Pro / Ultra

**Interface**:
```javascript
class AIModelInterface {
  async predict(context, market, options) {
    // 1. Select appropriate model
    const model = this.selectModel(options);
    
    // 2. Build prompt
    const prompt = this.buildPrompt(context, market);
    
    // 3. Call AI provider
    const response = await this.callProvider(model, prompt);
    
    // 4. Parse response
    const prediction = this.parseResponse(response);
    
    // 5. Validate output
    return this.validate(prediction);
  }
  
  selectModel(options) {
    // Model selection logic
    // - User preference
    // - Cost optimization
    // - Availability
    // - Performance history
  }
  
  buildPrompt(context, market) {
    // Prompt engineering
    // - System instructions
    // - Context injection
    // - Market-specific guidance
    // - Output format specification
  }
}
```

---

### 3. Prompt Engineering
**Purpose**: Optimize AI prompts for accurate predictions

**System Prompt Template**:
```
You are an expert football betting analyst with deep knowledge of:
- Team form and performance analysis
- Statistical modeling and probability
- Betting markets and odds interpretation
- Expected value calculation

Your task is to analyze the provided match context and generate a prediction for the {MARKET} market.

Guidelines:
1. Consider all provided data (form, H2H, odds, injuries)
2. Provide clear reasoning for your prediction
3. Assign a confidence score (0.0-1.0)
4. Calculate expected value if applicable
5. Be conservative with high-confidence predictions

Output Format (JSON):
{
  "prediction": "string",
  "confidence": 0.75,
  "reasoning": "detailed explanation",
  "key_factors": ["factor1", "factor2"],
  "expected_value": 0.58
}
```

**Market-Specific Prompts**:

**1X2 Market**:
```
Analyze the match and predict the outcome (Home Win, Draw, or Away Win).
Consider:
- Recent form and momentum
- Head-to-head record
- Home advantage
- Team quality and squad depth
- Motivation and stakes
```

**Over/Under 2.5 Goals**:
```
Predict whether the match will have Over or Under 2.5 total goals.
Consider:
- Average goals per game for both teams
- Defensive and offensive strength
- Recent scoring trends
- Playing styles (attacking vs defensive)
- Historical goal averages in H2H
```

**BTTS (Both Teams To Score)**:
```
Predict whether both teams will score (Yes or No).
Consider:
- Scoring consistency of both teams
- Defensive vulnerabilities
- Clean sheet records
- Attacking intent and necessity
```

---

### 4. Confidence Scoring
**Purpose**: Assign reliability score to predictions

**Factors**:
1. **Data Quality** (0-1): Completeness of context data
2. **Model Certainty** (0-1): AI model's confidence
3. **Historical Accuracy** (0-1): Model's past performance on similar predictions
4. **Odds Alignment** (0-1): How well prediction aligns with market odds
5. **Context Strength** (0-1): Strength of supporting factors

**Formula**:
```javascript
confidence = (
  data_quality * 0.2 +
  model_certainty * 0.3 +
  historical_accuracy * 0.3 +
  odds_alignment * 0.1 +
  context_strength * 0.1
)
```

**Confidence Levels**:
- 🟢 **High (0.75-1.0)**: Strong conviction, clear factors
- 🟡 **Medium (0.50-0.74)**: Moderate confidence, some uncertainty
- 🔴 **Low (0.0-0.49)**: Weak conviction, high uncertainty

---

### 5. Expected Value (EV) Calculator
**Purpose**: Calculate betting value

**Formula**:
```
EV = (Probability × Odds) - 1

Where:
- Probability = AI confidence / 100
- Odds = Decimal odds from bookmaker

Example:
- Prediction: Home Win
- Confidence: 75% (0.75)
- Odds: 2.10
- EV = (0.75 × 2.10) - 1 = 0.575 (57.5% expected return)
```

**EV Interpretation**:
- **EV > 0.20**: Excellent value bet
- **EV 0.10-0.20**: Good value
- **EV 0.05-0.10**: Marginal value
- **EV 0.00-0.05**: Break-even
- **EV < 0.00**: Negative value (avoid)

---

## 💾 Data Storage

### PostgreSQL Schema

```sql
-- Predictions table
CREATE TABLE predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fixture_id VARCHAR(255) NOT NULL,
  model VARCHAR(50) NOT NULL,
  market VARCHAR(50) NOT NULL,
  prediction VARCHAR(100) NOT NULL,
  confidence DECIMAL(3,2) NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  reasoning TEXT NOT NULL,
  key_factors JSONB,
  expected_value DECIMAL(5,2),
  odds DECIMAL(5,2),
  stake DECIMAL(10,2),
  result VARCHAR(20) CHECK (result IN ('won', 'lost', 'void', 'pending')),
  profit_loss DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW(),
  settled_at TIMESTAMP,
  INDEX idx_fixture (fixture_id),
  INDEX idx_model (model),
  INDEX idx_result (result),
  INDEX idx_created (created_at)
);

-- Context data table
CREATE TABLE prediction_context (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prediction_id UUID REFERENCES predictions(id) ON DELETE CASCADE,
  fixture_data JSONB NOT NULL,
  form_data JSONB NOT NULL,
  h2h_data JSONB NOT NULL,
  odds_data JSONB NOT NULL,
  injuries_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Model performance tracking
CREATE TABLE model_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  market VARCHAR(50) NOT NULL,
  total_predictions INT DEFAULT 0,
  correct_predictions INT DEFAULT 0,
  accuracy DECIMAL(5,2),
  avg_confidence DECIMAL(3,2),
  avg_ev DECIMAL(5,2),
  roi DECIMAL(5,2),
  total_stake DECIMAL(10,2),
  total_profit DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(model, date, market)
);

-- User predictions (for tracking user bets)
CREATE TABLE user_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  prediction_id UUID REFERENCES predictions(id),
  stake DECIMAL(10,2) NOT NULL,
  potential_return DECIMAL(10,2),
  actual_return DECIMAL(10,2),
  status VARCHAR(20) CHECK (status IN ('pending', 'won', 'lost', 'void')),
  created_at TIMESTAMP DEFAULT NOW(),
  settled_at TIMESTAMP,
  INDEX idx_user (user_id),
  INDEX idx_status (status)
);
```

### Redis Caching Strategy

**Cache Keys**:
```
fixture:{fixture_id}:context          # TTL: 1 hour
fixture:{fixture_id}:odds             # TTL: 15 minutes
team:{team_id}:form                   # TTL: 6 hours
team:{team_id}:stats                  # TTL: 24 hours
h2h:{team1_id}:{team2_id}            # TTL: 7 days
prediction:{prediction_id}            # TTL: 24 hours
smart_bets:{date}                     # TTL: 24 hours
```

**Cache Invalidation**:
- Fixture context: On odds update or lineup change
- Team form: After match completion
- Predictions: Never (immutable once created)

---

## 🔌 API Endpoints

### Generate Prediction
```http
POST /api/predictions/generate
Authorization: Bearer {token}
Content-Type: application/json

{
  "fixture_id": "12345",
  "markets": ["1X2", "Over/Under 2.5", "BTTS"],
  "model": "gpt-4",  // optional
  "options": {
    "include_reasoning": true,
    "calculate_ev": true
  }
}

Response 201:
{
  "prediction_id": "uuid",
  "fixture_id": "12345",
  "predictions": [
    {
      "market": "1X2",
      "prediction": "Home Win",
      "confidence": 0.75,
      "confidence_level": "high",
      "odds": 2.10,
      "expected_value": 0.58,
      "reasoning": "Arsenal's strong home form...",
      "key_factors": [
        "Home team won 4 of last 5",
        "Away team struggling defensively",
        "Historical home advantage"
      ]
    }
  ],
  "model_used": "gpt-4",
  "context_quality": 0.95,
  "generated_at": "2025-11-09T10:30:00Z",
  "cost": 0.03
}
```

### Get Prediction
```http
GET /api/predictions/:id
Authorization: Bearer {token}

Response 200:
{
  "prediction": {...},
  "context": {...},
  "performance": {
    "result": "won",
    "profit_loss": 11.00,
    "settled_at": "2025-11-09T17:00:00Z"
  }
}
```

### Batch Predictions
```http
GET /api/predictions/batch?date=2025-11-09&league=Premier%20League
Authorization: Bearer {token}

Response 200:
{
  "date": "2025-11-09",
  "league": "Premier League",
  "total_predictions": 10,
  "predictions": [...]
}
```

---

## 📊 Performance Monitoring

### Metrics Tracked
1. **Accuracy**: % of correct predictions
2. **Confidence Calibration**: Predicted vs actual confidence
3. **ROI**: Return on investment
4. **Win Rate by Market**: Performance per market
5. **Model Comparison**: Compare AI models
6. **Cost per Prediction**: API usage costs
7. **Response Time**: Prediction generation speed

### Monitoring Dashboard
- Real-time accuracy tracking
- Daily/weekly/monthly performance charts
- Model comparison matrix
- Cost analysis and optimization
- Alert system for accuracy drops

---

## 🔒 Security & Reliability

### API Key Management
- Store in environment variables
- Rotate keys monthly
- Monitor usage and costs
- Rate limiting per user tier

### Error Handling
```javascript
try {
  const prediction = await aiModel.predict(context, market);
  return prediction;
} catch (error) {
  if (error.type === 'rate_limit') {
    // Fallback to secondary model
    return await fallbackModel.predict(context, market);
  } else if (error.type === 'timeout') {
    // Return cached prediction if available
    return await cache.get(`prediction:${fixture_id}:${market}`);
  } else {
    // Log error and return graceful failure
    logger.error('Prediction failed', error);
    throw new PredictionError('Unable to generate prediction');
  }
}
```

### Fallback Strategy
1. **Primary**: OpenAI GPT-4
2. **Secondary**: Anthropic Claude
3. **Tertiary**: Google Gemini
4. **Final**: Heuristic-based prediction

---

## 💰 Cost Optimization

### Strategies
1. **Caching**: Cache similar predictions (30% cost reduction)
2. **Batch Processing**: Generate daily predictions in bulk
3. **Model Selection**: Use cheaper models for simple predictions
4. **Prompt Optimization**: Reduce token usage (20% savings)
5. **Rate Limiting**: Control user requests

### Cost Monitoring
- Track daily/monthly API costs
- Alert on budget thresholds
- Optimize high-cost operations
- A/B test cheaper models

---

## 🚀 Scalability

### Horizontal Scaling
- Stateless prediction service
- Load balancer for API requests
- Redis cluster for caching
- PostgreSQL read replicas

### Performance Targets
- **Response Time**: <2 seconds for single prediction
- **Throughput**: 100 predictions/minute
- **Uptime**: 99.9%
- **Cache Hit Rate**: >80%

---

## 📝 Next Steps

1. **Week 4 Day 2**: OpenAI API setup and basic integration
2. **Week 4 Day 3**: Prompt engineering and testing
3. **Week 4 Day 4**: Prediction API implementation
4. **Week 5**: Full AI integration and optimization

---

**Status**: 📋 Planned  
**Version**: 1.0  
**Last Updated**: 2025-11-09

---

*This architecture provides a solid foundation for Betopia's AI-powered prediction system, balancing performance, cost, and reliability.*
