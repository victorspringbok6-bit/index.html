/**
 * Apex Analytics - Football Intelligence Platform
 * Pure Vanilla JavaScript ES Module Implementation
 */

// ==========================================
// 1. DEMO DATASET & PROVIDER LAYER
// ==========================================

const DATA_METADATA = {
    status: "DEMO",
    lastUpdated: "2026-09-08T12:00:00Z"
};

const matchesDatabase = [
    // 2026-09-08 (FINISHED MATCHES)
    {
        id: "m101",
        date: "2026-09-08",
        competition: "UEFA Champions League",
        homeTeam: "AEK Athens",
        awayTeam: "LASK Linz",
        status: "FINISHED",
        homeScore: 2,
        awayScore: 1,
        prediction: "Home Win",
        predictedHomeGoals: 2,
        predictedAwayGoals: 1,
        confidence: 82,
        btts: true,
        over25: true,
        markets: ["1X2 prediction", "Correct Score", "Both Teams To Score", "Over 2.5 Goals", "BTTS & Win"]
    },
    {
        id: "m102",
        date: "2026-09-08",
        competition: "England Premier League",
        homeTeam: "Arsenal",
        awayTeam: "Chelsea",
        status: "FINISHED",
        homeScore: 3,
        awayScore: 1,
        prediction: "Home Win",
        predictedHomeGoals: 2,
        predictedAwayGoals: 0,
        confidence: 88,
        btts: true,
        over25: true,
        markets: ["1X2 prediction", "Over 2.5 Goals", "Both Teams To Score"]
    },
    {
        id: "m103",
        date: "2026-09-08",
        competition: "Spain La Liga",
        homeTeam: "Real Madrid",
        awayTeam: "Real Betis",
        status: "FINISHED",
        homeScore: 2,
        awayScore: 0,
        prediction: "Home Win",
        predictedHomeGoals: 3,
        predictedAwayGoals: 0,
        confidence: 90,
        btts: false,
        over25: false,
        markets: ["1X2 prediction", "Correct Score"]
    },

    // 2026-09-09 (SCHEDULED MATCHES - TODAY'S / TOMORROW'S CONTEXT)
    {
        id: "m104",
        date: "2026-09-09",
        competition: "UEFA Europa League",
        homeTeam: "AS Roma",
        awayTeam: "Feyenoord",
        status: "SCHEDULED",
        homeScore: null,
        awayScore: null,
        prediction: "Both Teams To Score",
        predictedHomeGoals: 2,
        predictedAwayGoals: 2,
        confidence: 75,
        btts: true,
        over25: true,
        markets: ["Both Teams To Score", "Over 2.5 Goals"]
    },
    {
        id: "m105",
        date: "2026-09-09",
        competition: "Germany Bundesliga",
        homeTeam: "Bayern Munich",
        awayTeam: "RB Leipzig",
        status: "SCHEDULED",
        homeScore: null,
        awayScore: null,
        prediction: "Over 2.5 Goals",
        predictedHomeGoals: 3,
        predictedAwayGoals: 2,
        confidence: 85,
        btts: true,
        over25: true,
        markets: ["Over 2.5 Goals", "BTTS & Win", "1X2 prediction"]
    },

    // 2026-09-10 (SCHEDULED MATCHES)
    {
        id: "m106",
        date: "2026-09-10",
        competition: "Italy Serie A",
        homeTeam: "Inter Milan",
        awayTeam: "AC Milan",
        status: "SCHEDULED",
        homeScore: null,
        awayScore: null,
        prediction: "Draw",
        predictedHomeGoals: 1,
        predictedAwayGoals: 1,
        confidence: 65,
        btts: true,
        over25: false,
        markets: ["1X2 prediction", "Correct Score", "Both Teams To Score"]
    },

    // 2026-09-11 (SCHEDULED MATCHES)
    {
        id: "m107",
        date: "2026-09-11",
        competition: "France Ligue 1",
        homeTeam: "PSG",
        awayTeam: "Marseille",
        status: "SCHEDULED",
        homeScore: null,
        awayScore: null,
        prediction: "Home Win",
        predictedHomeGoals: 3,
        predictedAwayGoals: 1,
        confidence: 89,
        btts: true,
        over25: true,
        markets: ["1X2 prediction", "BTTS & Win", "Over 2.5 Goals"]
    },

    // 2026-09-12 (SCHEDULED MATCHES)
    {
        id: "m108",
        date: "2026-09-12",
        competition: "England Premier League",
        homeTeam: "Liverpool",
        awayTeam: "Manchester City",
        status: "SCHEDULED",
        homeScore: null,
        awayScore: null,
        prediction: "Over 2.5 Goals",
        predictedHomeGoals: 2,
        predictedAwayGoals: 2,
        confidence: 91,
        btts: true,
        over25: true,
        markets: ["Over 2.5 Goals", "Both Teams To Score", "Correct Score"]
    }
];

const standingsDatabase = {
    "England Premier League": [
        { pos: 1, team: "Arsenal", p: 4, w: 3, d: 1, l: 0, gf: 10, ga: 2, gd: 8, pts: 10 },
        { pos: 2, team: "Liverpool", p: 4, w: 3, d: 1, l: 0, gf: 9, ga: 3, gd: 6, pts: 10 },
        { pos: 3, team: "Manchester City", p: 4, w: 3, d: 0, l: 1, gf: 11, ga: 4, gd: 7, pts: 9 },
        { pos: 4, team: "Chelsea", p: 4, w: 2, d: 1, l: 1, gf: 6, ga: 5, gd: 1, pts: 7 }
    ],
    "UEFA Champions League": [
        { pos: 1, team: "Real Madrid", p: 2, w: 2, d: 0, l: 0, gf: 5, ga: 0, gd: 5, pts: 6 },
        { pos: 2, team: "AEK Athens", p: 2, w: 1, d: 1, l: 0, gf: 3, ga: 2, gd: 1, pts: 4 },
        { pos: 3, team: "LASK Linz", p: 2, w: 0, d: 1, l: 1, gf: 2, ga: 3, gd: -1, pts: 1 }
    ]
};

// Data Provider Abstraction Class
export class FootballDataProvider {
    static async getMatches() {
        return Promise.resolve([...matchesDatabase]);
    }

    static async getStandings(competition) {
        return Promise.resolve(standingsDatabase[competition] || null);
    }

    static getMetadata() {
        return DATA_METADATA;
    }
}

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================

const state = {
    currentView: "predictions", // predictions, todays-tips, tomorrows-tips, results, tables, statistics, form, about
    selectedDate: "2026-09-08",
    selectedCompetition: "ALL",
    selectedMarket: "ALL",
    searchQuery: "",
    supportedDates: [
        "2026-09-08",
        "2026-09-09",
        "2026-09-10",
        "2026-09-11",
        "2026-09-12"
    ],
    competitions: [
        "UEFA Champions League",
        "UEFA Europa League",
        "England Premier League",
        "Spain La Liga",
        "Germany Bundesliga",
        "Italy Serie A",
        "France Ligue 1"
    ],
    markets: [
        "1X2 prediction",
        "Correct Score",
        "Both Teams To Score",
        "Over 2.5 Goals",
        "BTTS & Win"
    ]
};

function updateState(key, value) {
    state[key] = value;
    render();
}

// Helper to resolve dynamic reference dates without hardcoding logic
function getTodayDate() {
    return state.supportedDates[0];
}

function getTomorrowDate() {
    return state.supportedDates[1] || state.supportedDates[0];
}

// ==========================================
// 3. FILTERING & BUSINESS LOGIC ENGINE
// ==========================================

function getFilteredMatches() {
    return matchesDatabase.filter(match => {
        // 1. Search Query Filter (Operates COMPOSITELY alongside other active filters)
        if (state.searchQuery.trim() !== "") {
            const query = state.searchQuery.toLowerCase();
            const matchesHome = match.homeTeam.toLowerCase().includes(query);
            const matchesAway = match.awayTeam.toLowerCase().includes(query);
            const matchesComp = match.competition.toLowerCase().includes(query);
            if (!matchesHome && !matchesAway && !matchesComp) return false;
        }

        // 2. View / Date Filter Strategy
        let dateMatch = true;
        if (state.currentView === "predictions" || state.currentView === "results") {
            dateMatch = (match.date === state.selectedDate);
        } else if (state.currentView === "todays-tips") {
            dateMatch = (match.date === getTodayDate());
        } else if (state.currentView === "tomorrows-tips") {
            dateMatch = (match.date === getTomorrowDate());
        }

        if (!dateMatch) return false;

        // 3. Competition Filter
        if (state.selectedCompetition !== "ALL" && match.competition !== state.selectedCompetition) {
            return false;
        }

        // 4. Prediction Category Market Filter
        if (state.selectedMarket !== "ALL" && !match.markets.includes(state.selectedMarket)) {
            return false;
        }

        return true;
    });
}

// Helper to compute team form from strictly completed matches
function calculateTeamForm(teamName) {
    const finishedMatches = matchesDatabase.filter(
        m => m.status === "FINISHED" && (m.homeTeam === teamName || m.awayTeam === teamName)
    );

    if (finishedMatches.length === 0) return [];

    return finishedMatches.map(m => {
        const isHome = m.homeTeam === teamName;
        const teamGoals = isHome ? m.homeScore : m.awayScore;
        const oppGoals = isHome ? m.awayScore : m.homeScore;

        if (teamGoals > oppGoals) return "W";
        if (teamGoals === oppGoals) return "D";
        return "L";
    });
}

// Calculates statistics strictly separated into Finished (Actual) and Scheduled (Prediction)
function calculateStatisticsEngine() {
    const finished = matchesDatabase.filter(m => m.status === "FINISHED");
    const scheduled = matchesDatabase.filter(m => m.status === "SCHEDULED");

    // Actual Results Calculations
    const totalFinished = finished.length;
    let actualHomeWins = 0, actualDraws = 0, actualAwayWins = 0, actualTotalGoals = 0;
    let correct1X2 = 0;

    finished.forEach(m => {
        if (m.homeScore > m.awayScore) actualHomeWins++;
        else if (m.homeScore === m.awayScore) actualDraws++;
        else actualAwayWins++;

        actualTotalGoals += (m.homeScore + m.awayScore);

        // Check 1X2 Prediction Accuracy
        const actualOutcome = m.homeScore > m.awayScore ? "Home Win" : m.homeScore === m.awayScore ? "Draw" : "Away Win";
        if (m.prediction === actualOutcome) {
            correct1X2++;
        }
    });

    // Scheduled Predictions Calculations
    const totalScheduled = scheduled.length;
    let predictedHomeWins = 0, predictedDraws = 0, predictedAwayWins = 0;

    scheduled.forEach(m => {
        if (m.prediction === "Home Win") predictedHomeWins++;
        else if (m.prediction === "Draw") predictedDraws++;
        else if (m.prediction === "Away Win") predictedAwayWins++;
    });

    return {
        actual: {
            total: totalFinished,
            homeWins: totalFinished ? Math.round((actualHomeWins / totalFinished) * 100) : 0,
            draws: totalFinished ? Math.round((actualDraws / totalFinished) * 100) : 0,
            awayWins: totalFinished ? Math.round((actualAwayWins / totalFinished) * 100) : 0,
            avgGoals: totalFinished ? (actualTotalGoals / totalFinished).toFixed(2) : "0.00",
            accuracy1X2: totalFinished ? Math.round((correct1X2 / totalFinished) * 100) : 0,
            correct1X2Count: correct1X2
        },
        predictions: {
            total: totalScheduled,
            predictedHomeWinPct: totalScheduled ? Math.round((predictedHomeWins / totalScheduled) * 100) : 0,
            predictedDrawPct: totalScheduled ? Math.round((predictedDraws / totalScheduled) * 100) : 0,
            predictedAwayWinPct: totalScheduled ? Math.round((predictedAwayWins / totalScheduled) * 100) : 0
        }
    };
}

// ==========================================
// 4. UI COMPONENTS & RENDERING FUNCTIONS
// ==========================================

function renderSidebar() {
    const compList = document.getElementById("competitionList");
    const marketList = document.getElementById("marketList");

    compList.innerHTML = `
        <li>
            <button type="button" class="filter-item ${state.selectedCompetition === 'ALL' ? 'active' : ''}" data-comp="ALL">
                <span>All Leagues</span>
            </button>
        </li>
        ${state.competitions.map(c => `
            <li>
                <button type="button" class="filter-item ${state.selectedCompetition === c ? 'active' : ''}" data-comp="${c}">
                    <span>${c}</span>
                </button>
            </li>
        `).join('')}
    `;

    marketList.innerHTML = `
        <li>
            <button type="button" class="filter-item ${state.selectedMarket === 'ALL' ? 'active' : ''}" data-market="ALL">
                <span>All Markets</span>
            </button>
        </li>
        ${state.markets.map(m => `
            <li>
                <button type="button" class="filter-item ${state.selectedMarket === m ? 'active' : ''}" data-market="${m}">
                    <span>${m}</span>
                </button>
            </li>
        `).join('')}
    `;

    // Sidebar event handling
    compList.querySelectorAll('.filter-item').forEach(btn => {
        btn.addEventListener('click', () => updateState('selectedCompetition', btn.dataset.comp));
    });

    marketList.querySelectorAll('.filter-item').forEach(btn => {
        btn.addEventListener('click', () => updateState('selectedMarket', btn.dataset.market));
    });
}

function renderSubnav() {
    const container = document.getElementById("subnavContainer");

    container.innerHTML = `
        <div class="controls-wrapper">
            <div class="date-selector" role="group" aria-label="Date Selection">
                ${state.supportedDates.map(d => `
                    <button type="button" class="date-btn ${state.selectedDate === d && state.currentView === 'predictions' ? 'active' : ''}" data-date="${d}">
                        ${d === getTodayDate() ? "Sept 8 (Today)" : d === getTomorrowDate() ? "Sept 9 (Tomorrow)" : d}
                    </button>
                `).join('')}
            </div>
            <div class="active-filter-badge">
                View: <strong>${state.currentView.toUpperCase()}</strong> |
                Comp: <strong>${state.selectedCompetition}</strong> |
                Market: <strong>${state.selectedMarket}</strong>
                ${state.searchQuery ? ` | Search: <strong>"${state.searchQuery}"</strong>` : ''}
            </div>
        </div>
    `;

    container.querySelectorAll('.date-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.selectedDate = btn.dataset.date;
            if (state.currentView !== 'predictions') {
                state.currentView = 'predictions';
            }
            render();
        });
    });
}

function renderMatchCard(match) {
    const homeForm = calculateTeamForm(match.homeTeam);
    const awayForm = calculateTeamForm(match.awayTeam);

    return `
        <article class="prediction-card">
            <div class="card-header">
                <span>${match.competition} • ${match.date}</span>
                <span class="status-badge ${match.status === 'FINISHED' ? 'status-finished' : 'status-scheduled'}">${match.status}</span>
            </div>
            <div class="teams-container">
                <div class="team-row">
                    <span>${match.homeTeam}</span>
                    <div class="form-badges" aria-label="${match.homeTeam} recent form">
                        ${homeForm.length > 0 ? homeForm.map(f => `<span class="form-badge ${f}">${f}</span>`).join('') : '<span style="font-size:0.7rem; color:var(--text-secondary)">No prior data</span>'}
                    </div>
                </div>
                <div class="team-row">
                    <span>${match.awayTeam}</span>
                    <div class="form-badges" aria-label="${match.awayTeam} recent form">
                        ${awayForm.length > 0 ? awayForm.map(f => `<span class="form-badge ${f}">${f}</span>`).join('') : '<span style="font-size:0.7rem; color:var(--text-secondary)">No prior data</span>'}
                    </div>
                </div>
            </div>
            <div class="prediction-box">
                <div>
                    <div class="pred-label">Prediction</div>
                    <div class="pred-val">${match.prediction}</div>
                </div>
                <div style="text-align: right;">
                    <div class="pred-label">Predicted Score</div>
                    <div class="pred-val">${match.predictedHomeGoals} - ${match.predictedAwayGoals}</div>
                </div>
            </div>
            <div class="confidence-container">
                <div class="pred-label" style="display:flex; justify-content:space-between;">
                    <span>Confidence Score</span>
                    <span>${match.confidence}%</span>
                </div>
                <div class="confidence-bar" aria-label="Confidence level ${match.confidence} percent">
                    <div class="confidence-fill" style="width: ${match.confidence}%;"></div>
                </div>
            </div>
        </article>
    `;
}

function renderPredictionsView(matches) {
    if (matches.length === 0) {
        return `
            <div class="empty-state">
                <h3>No matches found</h3>
                <p>No predictions match your active filter or search criteria.</p>
            </div>
        `;
    }
    return `
        <div class="view-header">
            <h2>Match Predictions</h2>
            <p>Informational model outputs and statistical predictions.</p>
        </div>
        <div class="cards-grid">${matches.map(renderMatchCard).join('')}</div>
    `;
}

function renderResultsView(matches) {
    const finishedMatches = matches.filter(m => m.status === "FINISHED");

    if (finishedMatches.length === 0) {
        return `
            <div class="empty-state">
                <h3>No completed matches available</h3>
                <p>There are no finished results matching your current date/filter selection.</p>
            </div>
        `;
    }

    return `
        <div class="view-header">
            <h2>Actual Match Results</h2>
            <p>Evaluation of model predictions against completed match scores.</p>
        </div>
        <div class="data-table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Competition</th>
                        <th>Match</th>
                        <th>Actual Score</th>
                        <th>Predicted Score</th>
                        <th>Prediction</th>
                        <th>Outcome</th>
                    </tr>
                </thead>
                <tbody>
                    ${finishedMatches.map(m => {
                        const actualOutcome = m.homeScore > m.awayScore ? "Home Win" : m.homeScore === m.awayScore ? "Draw" : "Away Win";
                        const isCorrect = (m.prediction === actualOutcome);
                        return `
                            <tr>
                                <td>${m.date}</td>
                                <td>${m.competition}</td>
                                <td><strong>${m.homeTeam}</strong> vs <strong>${m.awayTeam}</strong></td>
                                <td><strong>${m.homeScore} - ${m.awayScore}</strong></td>
                                <td>${m.predictedHomeGoals} - ${m.predictedAwayGoals}</td>
                                <td>${m.prediction}</td>
                                <td>
                                    <span class="outcome-tag ${isCorrect ? 'outcome-correct' : 'outcome-incorrect'}">
                                        ${isCorrect ? 'CORRECT' : 'INCORRECT'}
                                    </span>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

async function renderTablesView() {
    const comp = state.selectedCompetition === "ALL" ? "England Premier League" : state.selectedCompetition;
    const standings = await FootballDataProvider.getStandings(comp);

    if (!standings) {
        return `
            <div class="view-header">
                <h2>League Standings</h2>
            </div>
            <div class="empty-state">
                <h3>Standings data unavailable for this competition</h3>
                <p>No table records are available for "${comp}" in the DEMO dataset.</p>
            </div>
        `;
    }

    return `
        <div class="view-header">
            <h2>${comp} - Standings</h2>
            <p>Current league table position and goal metrics.</p>
        </div>
        <div class="data-table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Pos</th>
                        <th>Team</th>
                        <th>P</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>GD</th>
                        <th>Pts</th>
                    </tr>
                </thead>
                <tbody>
                    ${standings.map(s => `
                        <tr>
                            <td><strong>${s.pos}</strong></td>
                            <td><strong>${s.team}</strong></td>
                            <td>${s.p}</td>
                            <td>${s.w}</td>
                            <td>${s.d}</td>
                            <td>${s.l}</td>
                            <td>${s.gf}</td>
                            <td>${s.ga}</td>
                            <td>${s.gd > 0 ? '+' + s.gd : s.gd}</td>
                            <td><strong>${s.pts}</strong></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderStatisticsView() {
    const stats = calculateStatisticsEngine();

    return `
        <div class="view-header">
            <h2>Statistics Engine</h2>
            <p>Strictly calculated metrics derived from actual completed matches vs model predictions.</p>
        </div>

        <h3 class="stats-section-title">Actual Completed Match Metrics</h3>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">${stats.actual.total}</div>
                <div class="stat-label">Total Completed Matches</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.actual.accuracy1X2}%</div>
                <div class="stat-label">1X2 Prediction Accuracy (${stats.actual.correct1X2Count}/${stats.actual.total})</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.actual.homeWins}%</div>
                <div class="stat-label">Actual Home Win Rate</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.actual.avgGoals}</div>
                <div class="stat-label">Avg Actual Goals / Match</div>
            </div>
        </div>

        <h3 class="stats-section-title">Upcoming Scheduled Prediction Distribution</h3>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">${stats.predictions.total}</div>
                <div class="stat-label">Scheduled Matches Sampled</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.predictions.predictedHomeWinPct}%</div>
                <div class="stat-label">Predicted Home Wins</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.predictions.predictedDrawPct}%</div>
                <div class="stat-label">Predicted Draws</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.predictions.predictedAwayWinPct}%</div>
                <div class="stat-label">Predicted Away Wins</div>
            </div>
        </div>
    `;
}

function renderFormView() {
    // Unique list of teams present in the database
    const teams = Array.from(new Set(matchesDatabase.flatMap(m => [m.homeTeam, m.awayTeam])));

    return `
        <div class="view-header">
            <h2>Team Form Analysis</h2>
            <p>Calculated form histories derived exclusively from completed dataset records.</p>
        </div>
        <div class="data-table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Calculated Form (Finished Matches)</th>
                        <th>Completed Games Count</th>
                    </tr>
                </thead>
                <tbody>
                    ${teams.map(t => {
                        const form = calculateTeamForm(t);
                        return `
                            <tr>
                                <td><strong>${t}</strong></td>
                                <td>
                                    <div class="form-badges">
                                        ${form.length > 0 ? form.map(f => `<span class="form-badge ${f}">${f}</span>`).join('') : '<span style="color:var(--text-secondary); font-size:0.8rem">No completed matches</span>'}
                                    </div>
                                </td>
                                <td>${form.length}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderAboutView() {
    const meta = FootballDataProvider.getMetadata();
    return `
        <div class="view-header">
            <h2>About & Architecture</h2>
            <p>Informational football analytics platform documentation.</p>
        </div>
        <div class="about-card">
            <h3>Purpose & Compliance</h3>
            <p>Apex Analytics is an informational football statistics and prediction engine designed to showcase data-driven analytics. It does not provide betting services, bookmaker integrations, or affiliate gambling links.</p>
        </div>
        <div class="about-card">
            <h3>Data Architecture & Status</h3>
            <p>Current Data Provider Status: <strong style="color: var(--draw-color);">${meta.status} DATA</strong></p>
            <ul>
                <li><strong>State Flow:</strong> Unidirectional (Data → State → Filters → UI Component).</li>
                <li><strong>API Readiness:</strong> Built on a decoupled provider model (<code>FootballDataProvider</code>) allowing quick replacement with live REST API services.</li>
                <li><strong>Integrity Guarantee:</strong> Predicted values are never recorded as actual results.</li>
            </ul>
        </div>
    `;
}

// ==========================================
// 5. MAIN RENDER LOOP & INITIALIZATION
// ==========================================

async function render() {
    renderSidebar();
    renderSubnav();

    const viewArea = document.getElementById("viewArea");
    const matches = getFilteredMatches();

    switch (state.currentView) {
        case "predictions":
        case "todays-tips":
        case "tomorrows-tips":
            viewArea.innerHTML = renderPredictionsView(matches);
            break;
        case "results":
            viewArea.innerHTML = renderResultsView(matches);
            break;
        case "tables":
            viewArea.innerHTML = await renderTablesView();
            break;
        case "statistics":
            viewArea.innerHTML = renderStatisticsView();
            break;
        case "form":
            viewArea.innerHTML = renderFormView();
            break;
        case "about":
            viewArea.innerHTML = renderAboutView();
            break;
        default:
            viewArea.innerHTML = renderPredictionsView(matches);
    }

    // Synchronize Top Navigation UI Links
    document.querySelectorAll('.main-nav .nav-link').forEach(btn => {
        if (btn.dataset.view === state.currentView) {
            btn.classList.add('active');
            btn.setAttribute('aria-current', 'page');
        } else {
            btn.classList.remove('active');
            btn.removeAttribute('aria-current');
        }
    });

    // Update clear button visibility on search bar
    const clearBtn = document.getElementById("clearSearchBtn");
    if (clearBtn) {
        clearBtn.hidden = state.searchQuery.trim() === "";
    }
}

function initApp() {
    // Navigation routing listeners
    document.querySelectorAll('.main-nav .nav-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetView = e.currentTarget.dataset.view;
            state.currentView = targetView;

            if (targetView === "todays-tips") {
                state.selectedDate = getTodayDate();
            } else if (targetView === "tomorrows-tips") {
                state.selectedDate = getTomorrowDate();
            }

            render();
        });
    });

    // Global Live Search input listener
    const searchInput = document.getElementById("globalSearchInput");
    const clearSearchBtn = document.getElementById("clearSearchBtn");

    searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        render();
    });

    clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        state.searchQuery = "";
        render();
    });

    // Initial load
    render();
}

document.addEventListener("DOMContentLoaded", initApp);