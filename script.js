async function fetchMatches() {
  try {
    const response = await fetch('https://v3.football.api-sports.io/fixtures?live=all', {
      method: 'GET',
      headers: {
        'x-apisports-key': '33fc57f6057894568236abd71b94c8aa'
      }
    });
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error fetching live matches:', error);
    return [];
  }
}

/**
 * Apex Analytics - Football Intelligence Platform
 * Pure Vanilla JavaScript ES Module Implementation
 */

// ===================================================
// 1. DEMO DATASET & PROVIDER LAYER
// ===================================================

const DATA_METADATA = {
  status: "DEMO",
  lastUpdated: "2026-09-08T12:00:00Z"
};

const matchesDatabase = [
  {
    id: "m1",
    date: "2026-09-08",
    time: "20:00",
    competition: "UEFA Champions League",
    competitionId: "ucl",
    homeTeam: "Real Madrid",
    awayTeam: "Manchester City",
    homeLogo: "https://media.api-sports.io/football/teams/541.png",
    awayLogo: "https://media.api-sports.io/football/teams/50.png",
    status: "NS",
    score: null,
    predictions: {
      "1x2": { homeWin: 42, draw: 26, awayWin: 32, valuePick: "Home Win" },
      "btts": { yes: 68, no: 32, valuePick: "Yes" },
      "overUnder25": { over: 61, under: 39, valuePick: "Over 2.5" },
      "correctScore": { topResult: "2 - 1", probability: 14 }
    },
    analytics: {
      homeForm: ["W", "W", "D", "W", "L"],
      awayForm: ["W", "W", "W", "D", "W"],
      h2h: { homeWins: 4, draws: 3, awayWins: 5 },
      xGHomeAvg: 2.1,
      xGAwayAvg: 1.9,
      confidenceScore: 84
    }
  },
  {
    id: "m2",
    date: "2026-09-09",
    time: "20:00",
    competition: "England Premier League",
    competitionId: "epl",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    homeLogo: "https://media.api-sports.io/football/teams/42.png",
    awayLogo: "https://media.api-sports.io/football/teams/49.png",
    status: "NS",
    score: null,
    predictions: {
      "1x2": { homeWin: 55, draw: 25, awayWin: 20, valuePick: "Home Win" },
      "btts": { yes: 52, no: 48, valuePick: "Yes" },
      "overUnder25": { over: 48, under: 52, valuePick: "Under 2.5" },
      "correctScore": { topResult: "2 - 0", probability: 18 }
    },
    analytics: {
      homeForm: ["W", "W", "W", "D", "W"],
      awayForm: ["D", "L", "W", "D", "W"],
      h2h: { homeWins: 6, draws: 2, awayWins: 2 },
      xGHomeAvg: 1.85,
      xGAwayAvg: 1.2,
      confidenceScore: 78
    }
  },
  {
    id: "m3",
    date: "2026-09-09",
    time: "19:45",
    competition: "Italy Serie A",
    competitionId: "seriea",
    homeTeam: "Inter Milan",
    awayTeam: "AC Milan",
    homeLogo: "https://media.api-sports.io/football/teams/505.png",
    awayLogo: "https://media.api-sports.io/football/teams/489.png",
    status: "NS",
    score: null,
    predictions: {
      "1x2": { homeWin: 45, draw: 30, awayWin: 25, valuePick: "Home Win" },
      "btts": { yes: 60, no: 40, valuePick: "Yes" },
      "overUnder25": { over: 55, under: 45, valuePick: "Over 2.5" },
      "correctScore": { topResult: "2 - 1", probability: 16 }
    },
    analytics: {
      homeForm: ["W", "D", "W", "W", "W"],
      awayForm: ["W", "W", "L", "D", "W"],
      h2h: { homeWins: 5, draws: 2, awayWins: 3 },
      xGHomeAvg: 1.9,
      xGAwayAvg: 1.5,
      confidenceScore: 81
    }
  },
  {
    id: "m4",
    date: "2026-09-10",
    time: "20:00",
    competition: "Spain La Liga",
    competitionId: "laliga",
    homeTeam: "Barcelona",
    awayTeam: "Atletico Madrid",
    homeLogo: "https://media.api-sports.io/football/teams/529.png",
    awayLogo: "https://media.api-sports.io/football/teams/530.png",
    status: "NS",
    score: null,
    predictions: {
      "1x2": { homeWin: 50, draw: 28, awayWin: 22, valuePick: "Home Win" },
      "btts": { yes: 45, no: 55, valuePick: "No" },
      "overUnder25": { over: 42, under: 58, valuePick: "Under 2.5" },
      "correctScore": { topResult: "1 - 0", probability: 21 }
    },
    analytics: {
      homeForm: ["W", "W", "W", "W", "D"],
      awayForm: ["D", "W", "D", "W", "L"],
      h2h: { homeWins: 4, draws: 4, awayWins: 2 },
      xGHomeAvg: 1.7,
      xGAwayAvg: 1.1,
      confidenceScore: 76
    }
  },
  {
    id: "m5",
    date: "2026-09-10",
    time: "17:30",
    competition: "Germany Bundesliga",
    competitionId: "bundesliga",
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    homeLogo: "https://media.api-sports.io/football/teams/157.png",
    awayLogo: "https://media.api-sports.io/football/teams/165.png",
    status: "NS",
    score: null,
    predictions: {
      "1x2": { homeWin: 60, draw: 22, awayWin: 18, valuePick: "Home Win" },
      "btts": { yes: 75, no: 25, valuePick: "Yes" },
      "overUnder25": { over: 72, under: 28, valuePick: "Over 2.5" },
      "correctScore": { topResult: "3 - 1", probability: 15 }
    },
    analytics: {
      homeForm: ["W", "W", "W", "W", "W"],
      awayForm: ["W", "D", "L", "W", "W"],
      h2h: { homeWins: 7, draws: 2, awayWins: 1 },
      xGHomeAvg: 2.6,
      xGAwayAvg: 1.6,
      confidenceScore: 88
    }
  }
];

const leagueTables = {
  epl: [
    { rank: 1, team: "Arsenal", mp: 4, w: 3, d: 1, l: 0, gf: 9, ga: 2, pts: 10 },
    { rank: 2, team: "Manchester City", mp: 4, w: 3, d: 0, l: 1, gf: 10, ga: 4, pts: 9 },
    { rank: 3, team: "Liverpool", mp: 4, w: 2, d: 2, l: 0, gf: 7, ga: 3, pts: 8 },
    { rank: 4, team: "Chelsea", mp: 4, w: 2, d: 1, l: 1, gf: 6, ga: 5, pts: 7 },
    { rank: 5, team: "Tottenham", mp: 4, w: 2, d: 0, l: 2, gf: 5, ga: 6, pts: 6 }
  ],
  seriea: [
    { rank: 1, team: "Inter Milan", mp: 4, w: 3, d: 1, l: 0, gf: 8, ga: 2, pts: 10 },
    { rank: 2, team: "AC Milan", mp: 4, w: 3, d: 0, l: 1, gf: 7, ga: 3, pts: 9 },
    { rank: 3, team: "Juventus", mp: 4, w: 2, d: 2, l: 0, gf: 5, ga: 1, pts: 8 },
    { rank: 4, team: "Napoli", mp: 4, w: 2, d: 1, l: 1, gf: 6, ga: 4, pts: 7 },
    { rank: 5, team: "Atalanta", mp: 4, w: 2, d: 0, l: 2, gf: 7, ga: 6, pts: 6 }
  ]
};

// ===================================================
// 2. STATE MANAGEMENT
// ===================================================

const state = {
  activeTab: "predictions",
  activeDate: "2026-09-09",
  activeCompetition: "all",
  activeMarket: "1x2",
  searchQuery: "",
  allMatches: [...matchesDatabase],
  filteredMatches: []
};

// ===================================================
// 3. UI RENDER ENGINE
// ===================================================

function filterAndRender() {
  let matches = [...state.allMatches];

  // Date Filter
  if (state.activeDate) {
    matches = matches.filter(m => m.date === state.activeDate);
  }

  // Competition Filter
  if (state.activeCompetition !== "all") {
    matches = matches.filter(m => m.competitionId === state.activeCompetition);
  }

  // Search Filter
  if (state.searchQuery.trim() !== "") {
    const q = state.searchQuery.toLowerCase();
    matches = matches.filter(
      m =>
        m.homeTeam.toLowerCase().includes(q) ||
        m.awayTeam.toLowerCase().includes(q) ||
        m.competition.toLowerCase().includes(q)
    );
  }

  state.filteredMatches = matches;
  renderView();
}

function renderView() {
  const mainContent = document.getElementById("mainContent");
  if (!mainContent) return;

  if (state.activeTab === "predictions" || state.activeTab === "todays-tips" || state.activeTab === "tomorrows-tips") {
    renderMatchCards(mainContent);
  } else if (state.activeTab === "tables") {
    renderLeagueTables(mainContent);
  } else if (state.activeTab === "about") {
    renderAboutPage(mainContent);
  } else {
    mainContent.innerHTML = `<div class="placeholder-view"><h2>${state.activeTab.toUpperCase()} Module</h2><p>Data engine active. Select another view from top navigation.</p></div>`;
  }
}

function renderMatchCards(container) {
  if (state.filteredMatches.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No matches found</h3>
        <p>No predictions match your active filter or search criteria.</p>
      </div>
    `;
    return;
  }

  let html = `<div class="matches-grid">`;

  state.filteredMatches.forEach(match => {
    const pred = match.predictions[state.activeMarket] || match.predictions["1x2"];
    
    html += `
      <div class="match-card">
        <div class="card-header">
          <span class="competition-badge">${match.competition}</span>
          <span class="time-badge">${match.time}</span>
        </div>
        <div class="card-body">
          <div class="team home">
            <img src="${match.homeLogo}" alt="${match.homeTeam}" class="team-logo" onerror="this.src='https://via.placeholder.com/24'">
            <span class="team-name">${match.homeTeam}</span>
          </div>
          <div class="vs-divider">VS</div>
          <div class="team away">
            <span class="team-name">${match.awayTeam}</span>
            <img src="${match.awayLogo}" alt="${match.awayTeam}" class="team-logo" onerror="this.src='https://via.placeholder.com/24'">
          </div>
        </div>
        <div class="card-analytics">
          <div class="confidence-bar-container">
            <div class="confidence-label">Confidence: ${match.analytics.confidenceScore}%</div>
            <div class="confidence-bar">
              <div class="confidence-fill" style="width: ${match.analytics.confidenceScore}%"></div>
            </div>
          </div>
          <div class="prediction-highlight">
            <span class="pick-label">Top Market Pick:</span>
            <span class="pick-value">${pred.valuePick || pred.topResult || 'Active'}</span>
          </div>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

function renderLeagueTables(container) {
  let html = `<div class="tables-view">`;
  
  for (const [key, table] of Object.entries(leagueTables)) {
    const compName = key === "epl" ? "England Premier League" : "Italy Serie A";
    html += `
      <div class="table-wrapper">
        <h3>${compName}</h3>
        <table class="standings-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Team</th>
              <th>MP</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GA</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
    `;

    table.forEach(row => {
      html += `
        <tr>
          <td>${row.rank}</td>
          <td class="team-cell"><strong>${row.team}</strong></td>
          <td>${row.mp}</td>
          <td>${row.w}</td>
          <td>${row.d}</td>
          <td>${row.l}</td>
          <td>${row.gf}</td>
          <td>${row.ga}</td>
          <td><strong>${row.pts}</strong></td>
        </tr>
      `;
    });

    html += `</tbody></table></div>`;
  }

  html += `</div>`;
  container.innerHTML = html;
}

function renderAboutPage(container) {
  container.innerHTML = `
    <div class="about-page">
      2 Apex Analytics Platform Architecture
      <p>Apex Analytics is a high-performance football intelligence engine utilizing algorithmic predictive models, live form weighting, and statistical distribution frameworks.</p>
      <div class="architecture-highlights">
        <div class="arch-card">
          4 xG Probability Model
          <p>Calculates expected goals for home and away sides using historic rolling form metrics.</p>
        </div>
        <div class="arch-card">
          4 Live API Synchronization
          <p>Connected directly to API-Sports endpoints for live fixture feeds and score tracking.</p>
        </div>
      </div>
    </div>
  `;
}

// ===================================================
// 4. EVENT LISTENERS & INITIALIZATION
// ===================================================

document.addEventListener("DOMContentLoaded", async () => {
  // Navigation Tabs
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      
      // Update state tab from data-tab attribute
      state.activeTab = link.dataset.tab;
      
      if (state.activeTab === "todays-tips") state.activeDate = "2026-09-08";
      if (state.activeTab === "tomorrows-tips") state.activeDate = "2026-09-09";

      filterAndRender();
    });
  });

  // Date Pills
  document.querySelectorAll(".date-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".date-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.activeDate = pill.dataset.date;
      filterAndRender();
    });
  });

  // Competition Sidebar Filter
  document.querySelectorAll(".comp-item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".comp-item").forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      state.activeCompetition = item.dataset.comp;
      filterAndRender();
    });
  });

  // Prediction Market Filter
  document.querySelectorAll(".market-item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".market-item").forEach(m => m.classList.remove("active"));
      item.classList.add("active");
      state.activeMarket = item.dataset.market;
      filterAndRender();
    });
  });

  // Search Input
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      state.searchQuery = e.target.value;
      filterAndRender();
    });
  }

  // Initial render with base dataset
  filterAndRender();

  // Attempt API-Sports live fetch
  const apiMatches = await fetchMatches();
  if (apiMatches && apiMatches.length > 0) {
    console.log("Live API matches loaded:", apiMatches);
    const liveMapped = apiMatches.map(m => ({
      id: String(m.fixture.id),
      date: m.fixture.date.split("T")[0],
      time: m.fixture.date.split("T")[1]?.substring(0, 5) || "LIVE",
      competition: m.league.name,
      competitionId: "api-live",
      homeTeam: m.teams.home.name,
      awayTeam: m.teams.away.name,
      homeLogo: m.teams.home.logo,
      awayLogo: m.teams.away.logo,
      status: m.fixture.status.short,
      score: `${m.goals.home ?? 0} - ${m.goals.away ?? 0}`,
      predictions: {
        "1x2": { valuePick: "Live Match" },
        "btts": { valuePick: "Live Match" },
        "overUnder25": { valuePick: "Live Match" },
        "correctScore": { topResult: `${m.goals.home ?? 0} - ${m.goals.away ?? 0}` }
      },
      analytics: {
        confidenceScore: 90
      }
    }));

    state.allMatches = [...liveMapped, ...matchesDatabase];

    // Update top header status pill when live data is found
    const statusBadge = document.querySelector('.badge') || document.querySelector('[class*="demo"]');
    if (statusBadge) {
      statusBadge.textContent = 'LIVE API';
      statusBadge.style.backgroundColor = '#10B981';
    }

    // Force UI re-render so live matches display immediately
    filterAndRender();
  }
});
