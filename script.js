/* ==========================================================================
   Apex Analytics - Master Application Controller (script.js)
   ========================================================================== */

import { PREMIER_LEAGUE_MASTER } from './premierLeagueData.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log("Apex Analytics initialized.");
  console.log("Master Data Feed Loaded:", PREMIER_LEAGUE_MASTER);

  const navTabs = document.querySelectorAll('.nav-tab');
  const mainContent = document.getElementById('main-content');

  // Initial Default View Load
  renderView('predictions', mainContent);

  // Tab Navigation Handler
  navTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      navTabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      const targetView = e.target.getAttribute('data-view');
      renderView(targetView, mainContent);
    });
  });
});

/**
 * Main View Router
 */
function renderView(viewName, container) {
  if (!container) return;

  switch (viewName) {
    case 'predictions':
      renderPredictionsView(container);
      break;
    case 'results':
      renderResultsView(container);
      break;
    case 'league-tables':
      renderLeagueTableView(container);
      break;
    case 'team-form':
      renderTeamFormView(container);
      break;
    default:
      container.innerHTML = `
        <div class="placeholder-card">
          <h2>${viewName.replace('-', ' ').toUpperCase()}</h2>
          <p>View content loading...</p>
        </div>
      `;
  }
}

/**
 * Render Predictions View (Upcoming Season Fixtures)
 */
function renderPredictionsView(container) {
  const upcomingFixtures = PREMIER_LEAGUE_MASTER.schedule2026_2027.filter(f => f.status === 'NS');
  
  if (upcomingFixtures.length === 0) {
    container.innerHTML = `<div class="placeholder-card"><p>No upcoming matches scheduled.</p></div>`;
    return;
  }

  let html = `<div class="team-form-grid">`;

  upcomingFixtures.forEach(fixture => {
    const homeTeamObj = PREMIER_LEAGUE_MASTER.teams.find(t => t.name === fixture.homeTeam) || {};
    const awayTeamObj = PREMIER_LEAGUE_MASTER.teams.find(t => t.name === fixture.awayTeam) || {};

    html += `
      <div class="team-card">
        <div class="stat-row">
          <span class="stadium-text">Gameweek ${fixture.gw} • ${fixture.date}</span>
          <span class="badge">${fixture.time}</span>
        </div>
        <div class="team-header" style="justify-content: space-between; margin: 12px 0;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <img src="${homeTeamObj.logo || ''}" class="team-logo" alt="${fixture.homeTeam}">
            <strong>${fixture.homeTeam}</strong>
          </div>
          <span style="color: #94a3b8; font-weight: bold;">VS</span>
          <div style="display: flex; align-items: center; gap: 8px;">
            <strong>${fixture.awayTeam}</strong>
            <img src="${awayTeamObj.logo || ''}" class="team-logo" alt="${fixture.awayTeam}">
          </div>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

/**
 * Render Results View (Completed Season Fixtures)
 */
function renderResultsView(container) {
  const completedFixtures = PREMIER_LEAGUE_MASTER.schedule2026_2027.filter(f => f.status === 'FT');

  if (completedFixtures.length === 0) {
    container.innerHTML = `<div class="placeholder-card"><p>No match results found.</p></div>`;
    return;
  }

  let html = `
    <table class="data-table">
      <thead>
        <tr>
          <th>GW</th>
          <th>Date</th>
          <th>Home Team</th>
          <th>Score</th>
          <th>Away Team</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
  `;

  completedFixtures.forEach(fixture => {
    html += `
      <tr>
        <td>${fixture.gw}</td>
        <td>${fixture.date}</td>
        <td><strong>${fixture.homeTeam}</strong></td>
        <td><span class="badge" style="background: #2563eb; color: #fff;">${fixture.score}</span></td>
        <td><strong>${fixture.awayTeam}</strong></td>
        <td>${fixture.status}</td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

/**
 * Render Team Form View (Active Managers & Club Cards)
 */
function renderTeamFormView(container) {
  let html = `<div class="team-form-grid">`;
  
  PREMIER_LEAGUE_MASTER.teams.forEach(team => {
    html += `
      <div class="team-card">
        <div class="team-header">
          <img src="${team.logo}" class="team-logo" alt="${team.name}">
          <div>
            <h3>${team.name}</h3>
            <p class="stadium-text">${team.stadium}</p>
          </div>
        </div>
        <div class="manager-info">
          <p><strong>Manager:</strong> ${team.manager.name}</p>
          <div class="stat-row">
            <span>Tenure Win Rate:</span>
            <strong>${team.manager.record.winRate}%</strong>
          </div>
          <p class="stat-detail">${team.manager.record.wins}W - ${team.manager.record.draws}D - ${team.manager.record.losses}L (${team.manager.record.matches} games)</p>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

/**
 * Render League Table View
 */
function renderLeagueTableView(container) {
  let html = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Club</th>
          <th>Stadium</th>
          <th>Manager</th>
          <th>Appointed</th>
          <th>Win %</th>
        </tr>
      </thead>
      <tbody>
  `;

  PREMIER_LEAGUE_MASTER.teams.forEach(team => {
    html += `
      <tr>
        <td class="team-cell">
          <img src="${team.logo}" width="24" height="24" alt="${team.name}">
          ${team.name}
        </td>
        <td>${team.stadium}</td>
        <td>${team.manager.name}</td>
        <td>${team.manager.appointed}</td>
        <td><strong>${team.manager.record.winRate}%</strong></td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}
