# Betting Patterns Implementation Guide

## Overview
This guide provides step-by-step instructions to implement the Betting Patterns Analysis feature in dashboard.html.

## Implementation Steps

### Step 1: Add CSS Styles
Add the following CSS to the `<style>` section (before `</style>` tag around line 203):

```css
    /* Betting Patterns */
    .pattern-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:16px; margin-top:16px; }
    .pattern-card { background:#0b0b12; border:1px solid #2a2151; border-radius:10px; padding:16px; }
    .pattern-card.winning { border-color:#2a914a; }
    .pattern-card.losing { border-color:#b54949; }
    .pattern-header { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
    .pattern-icon { font-size:24px; }
    .pattern-title { font-size:14px; font-weight:600; opacity:0.9; }
    .pattern-metrics { display:flex; flex-direction:column; gap:8px; }
    .pattern-metric { display:flex; justify-content:space-between; font-size:13px; padding:6px 0; border-bottom:1px solid #1a1a2e; }
    .pattern-metric:last-child { border-bottom:none; }
    .pattern-label { opacity:0.8; }
    .pattern-value { font-weight:600; }
    .pattern-value.green { color:#2a914a; }
    .pattern-value.red { color:#b54949; }
    
    .recommendation-list { display:flex; flex-direction:column; gap:12px; margin-top:16px; }
    .recommendation-card { background:#0b0b12; border:1px solid #5a4a9f; border-radius:10px; padding:14px; display:flex; gap:12px; }
    .recommendation-icon { font-size:24px; flex-shrink:0; }
    .recommendation-content { flex:1; }
    .recommendation-title { font-size:14px; font-weight:600; margin-bottom:6px; }
    .recommendation-text { font-size:13px; opacity:0.9; line-height:1.5; }
    .tip-badge { display:inline-block; padding:4px 8px; border-radius:6px; font-size:11px; font-weight:600; margin-top:6px; }
    .tip-badge.success { background:#11311f; color:#2a914a; }
    .tip-badge.warning { background:#322d10; color:#a5972a; }
    .tip-badge.info { background:#1a1030; color:#7a6abf; }
    
    .frequency-stat { display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #1a1a2e; }
    .frequency-stat:last-child { border-bottom:none; }
    .frequency-label { font-size:13px; opacity:0.8; }
    .frequency-value { font-size:16px; font-weight:600; }
    
    .stake-info { display:flex; flex-direction:column; gap:12px; }
    .stake-row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #1a1a2e; }
    .stake-row:last-child { border-bottom:none; }
    .stake-label { font-size:13px; opacity:0.8; }
    .stake-value { font-size:16px; font-weight:600; }
    
    .risk-gauge { margin-top:12px; }
    .risk-bar { height:8px; background:#1a1a2e; border-radius:4px; overflow:hidden; margin-top:8px; }
    .risk-fill { height:100%; transition: width 0.3s; }
    .risk-fill.low { background:#2a914a; }
    .risk-fill.medium { background:#a5972a; }
    .risk-fill.high { background:#b54949; }
    .risk-label { font-size:12px; opacity:0.7; margin-top:6px; text-align:center; }
```

### Step 2: Add HTML Section
Add the following HTML after the Advanced Statistics section (around line 318, before the Filters section):

```html
    <!-- Betting Patterns Analysis -->
    <div class="analytics-section">
      <div class="section-header">
        <h2 class="section-title">🎲 Betting Patterns Analysis</h2>
      </div>

      <!-- Betting Behavior -->
      <div class="stat-card" style="margin-bottom:20px;">
        <div class="stat-card-title">📊 Betting Behavior</div>
        <div class="breakdown-grid">
          <div class="breakdown-card">
            <div class="breakdown-title">Favorite Markets</div>
            <div class="chart-container" style="height:200px;">
              <canvas id="marketPieChart"></canvas>
            </div>
          </div>
          <div class="breakdown-card">
            <div class="breakdown-title">Betting Frequency</div>
            <div id="betting-frequency"></div>
          </div>
          <div class="breakdown-card">
            <div class="breakdown-title">Average Stake & Risk</div>
            <div id="stake-risk"></div>
          </div>
        </div>
      </div>

      <!-- Pattern Recognition -->
      <div class="stat-card" style="margin-bottom:20px;">
        <div class="stat-card-title">🔍 Pattern Recognition</div>
        <div id="pattern-recognition"></div>
      </div>

      <!-- Recommendations -->
      <div class="stat-card">
        <div class="stat-card-title">💡 Personalized Recommendations</div>
        <div id="recommendations"></div>
      </div>
    </div>
```

### Step 3: Add JavaScript Variable
Add this variable declaration after line 378 (after `let currentView = 'list';`):

```javascript
    let marketPieChart = null;
```

### Step 4: Add JavaScript Functions
Add the complete betting patterns JavaScript code from BETTING_PATTERNS_CODE.md (lines 103-563) before the `renderDashboard()` function.

### Step 5: Update renderDashboard Function
Find the `renderDashboard()` function and add this line after `renderAdvancedStats(allBets);`:

```javascript
      renderBettingPatterns(allBets);
```

## Verification
After implementation:
1. Open dashboard.html in browser
2. Verify "Betting Patterns Analysis" section appears
3. Check all visualizations render correctly
4. Test with different bet data

## Files Modified
- `backend/public/dashboard.html` - Main implementation file

## Estimated Time
15-20 minutes for complete implementation
