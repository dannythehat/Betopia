// API Configuration
const API_BASE = 'http://127.0.0.1:8081';

// State
let allFixtures = [];
let currentFilters = {
  league: '',
  date: '',
  team: ''
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadFixtures();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  document.getElementById('leagueFilter').addEventListener('change', (e) => {
    currentFilters.league = e.target.value;
    applyFilters();
  });
  
  document.getElementById('dateFilter').addEventListener('change', (e) => {
    currentFilters.date = e.target.value;
    applyFilters();
  });
  
  document.getElementById('teamFilter').addEventListener('input', (e) => {
    currentFilters.team = e.target.value;
    applyFilters();
  });
}

// Load fixtures from API
async function loadFixtures() {
  const status = document.getElementById('status');
  const fixturesContainer = document.getElementById('fixtures');
  
  try {
    status.className = 'loading';
    status.textContent = 'Loading fixtures...';
    
    const res = await fetch(`${API_BASE}/api/fixtures`);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    
    const data = await res.json();
    allFixtures = data.fixtures || [];
    
    status.style.display = 'none';
    renderFixtures(allFixtures);
    
  } catch (e) {
    console.error('Error loading fixtures:', e);
    status.className = 'error';
    status.textContent = `Error loading fixtures: ${e.message}. Make sure the backend is running on ${API_BASE}`;
    fixturesContainer.innerHTML = '';
  }
}

// Apply filters
function applyFilters() {
  let filtered = allFixtures;
  
  // Filter by league
  if (currentFilters.league) {
    filtered = filtered.filter(f => 
      f.league.name.toLowerCase().includes(currentFilters.league.toLowerCase())
    );
  }
  
  // Filter by date
  if (currentFilters.date) {
    filtered = filtered.filter(f => 
      f.kickoff.startsWith(currentFilters.date)
    );
  }
  
  // Filter by team
  if (currentFilters.team) {
    const teamSearch = currentFilters.team.toLowerCase();
    filtered = filtered.filter(f => 
      f.homeTeam.toLowerCase().includes(teamSearch) ||
      f.awayTeam.toLowerCase().includes(teamSearch)
    );
  }
  
  renderFixtures(filtered);
}

// Clear all filters
function clearFilters() {
  currentFilters = { league: '', date: '', team: '' };
  document.getElementById('leagueFilter').value = '';
  document.getElementById('dateFilter').value = '';
  document.getElementById('teamFilter').value = '';
  renderFixtures(allFixtures);
}

// Render fixtures
function renderFixtures(fixtures) {
  const container = document.getElementById('fixtures');
  
  if (fixtures.length === 0) {
    container.innerHTML = '<div class="no-fixtures">No fixtures found. Try adjusting your filters.</div>';
    return;
  }
  
  container.innerHTML = fixtures.map(fixture => renderFixtureCard(fixture)).join('');
}

// Render single fixture card
function renderFixtureCard(fixture) {
  const kickoffDate = new Date(fixture.kickoff);
  const formattedDate = kickoffDate.toLocaleDateString('en-GB', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return `
    <div class="fixture-card">
      <div class="fixture-header">
        <span class="league-badge">${fixture.league.name}</span>
        <span class="kickoff-time">${formattedDate}</span>
      </div>
      
      <div class="teams">
        <span>${fixture.homeTeam}</span>
        <span class="vs">vs</span>
        <span>${fixture.awayTeam}</span>
      </div>
      
      ${fixture.venue ? `<div style="text-align: center; color: #666; font-size: 0.875rem; margin-bottom: 1rem;">
        📍 ${fixture.venue.name}, ${fixture.venue.city}
      </div>` : ''}
      
      <div class="markets">
        ${renderMatchResultMarket(fixture.markets.matchResult)}
        ${renderOverUnderMarket(fixture.markets.overUnder)}
        ${renderBTTSMarket(fixture.markets.bothTeamsToScore)}
      </div>
      
      ${renderFormAndH2H(fixture)}
    </div>
  `;
}

// Render Match Result (1X2) market
function renderMatchResultMarket(market) {
  if (!market) return '';
  
  return `
    <div class="market">
      <div class="market-title">Match Result (1X2)</div>
      <div class="odds">
        <div class="odd-button">
          <span class="odd-label">Home</span>
          <span class="odd-value">${market.home}</span>
        </div>
        <div class="odd-button">
          <span class="odd-label">Draw</span>
          <span class="odd-value">${market.draw}</span>
        </div>
        <div class="odd-button">
          <span class="odd-label">Away</span>
          <span class="odd-value">${market.away}</span>
        </div>
      </div>
    </div>
  `;
}

// Render Over/Under market
function renderOverUnderMarket(market) {
  if (!market) return '';
  
  return `
    <div class="market">
      <div class="market-title">Over/Under ${market.line}</div>
      <div class="odds">
        <div class="odd-button">
          <span class="odd-label">Over</span>
          <span class="odd-value">${market.over}</span>
        </div>
        <div class="odd-button">
          <span class="odd-label">Under</span>
          <span class="odd-value">${market.under}</span>
        </div>
      </div>
    </div>
  `;
}

// Render BTTS market
function renderBTTSMarket(market) {
  if (!market) return '';
  
  return `
    <div class="market">
      <div class="market-title">Both Teams To Score</div>
      <div class="odds">
        <div class="odd-button">
          <span class="odd-label">Yes</span>
          <span class="odd-value">${market.yes}</span>
        </div>
        <div class="odd-button">
          <span class="odd-label">No</span>
          <span class="odd-value">${market.no}</span>
        </div>
      </div>
    </div>
  `;
}

// Render form and H2H
function renderFormAndH2H(fixture) {
  if (!fixture.form && !fixture.headToHead) return '';
  
  return `
    <div class="form-h2h">
      ${fixture.form ? `
        <div>
          <strong>Recent Form</strong>
          <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
            <div>
              <div style="font-size: 0.75rem; color: #666; margin-bottom: 0.25rem;">Home</div>
              <div class="form">
                ${fixture.form.home.split('').map(r => `<div class="form-result ${r}">${r}</div>`).join('')}
              </div>
            </div>
            <div>
              <div style="font-size: 0.75rem; color: #666; margin-bottom: 0.25rem;">Away</div>
              <div class="form">
                ${fixture.form.away.split('').map(r => `<div class="form-result ${r}">${r}</div>`).join('')}
              </div>
            </div>
          </div>
        </div>
      ` : ''}
      
      ${fixture.headToHead ? `
        <div>
          <strong>Head to Head (Last ${fixture.headToHead.played})</strong>
          <div style="margin-top: 0.5rem; color: #666;">
            Home: ${fixture.headToHead.homeWins}W | 
            Draw: ${fixture.headToHead.draws}D | 
            Away: ${fixture.headToHead.awayWins}W
          </div>
        </div>
      ` : ''}
    </div>
  `;
}
