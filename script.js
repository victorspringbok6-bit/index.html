import { 
  getUpcomingFixtures, 
  getRecentResults, 
  getLeagueStandings, 
  getTeamsAndManagers 
} from './premierLeagueData.js';

document.addEventListener('DOMContentLoaded', () => {
  const navTabs = document.querySelectorAll('.nav-tab');
  const mainContent = document.getElementById('main-content');

  // Load initial view
  renderView('predictions', mainContent);

  navTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      navTabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      const targetView = e.target.getAttribute('data-view');
      renderView(targetView, mainContent);
    });
  });
});

async function renderView(viewName, container) {
  if (!container) return;
  
  // Render loading state
  container.innerHTML = `<div class="placeholder-card"><h2>Loading live data...</h2></div>`;

  switch (viewName) {
    case 'predictions':
      await renderPredictionsView(container);
      break;
    case 'results':
      await renderResultsView(container);
      break;
    case 'league-tables':
      await renderLeagueTableView(container);
      break;
    case 'team-form':
      await renderTeamFormView(container);
      break;
    default:
      container.innerHTML = `<div class="placeholder-card"><h2>View Not Found</h2></div>`;
  }
}

async function renderPredictionsView(container) {
  const fixtures = await getUpcomingFixtures();
  
  if (!fixtures || fixtures.length === 0) {
    container.innerHTML = `<div class="placeholder-card"><p>No upcoming matches found.</p></div>`;
    return;
  }

  let html = `<div class="team-form-grid">`;
  fixtures.forEach(item => {
    const f = item.fixture;
    const h = item.teams.home;
    const a = item.teams.away;
    const matchDate = new Date(f.date).toLocaleDateString();
    const matchTime = new Date(f.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    html += `
      <div class="team-card">
        <div class="stat-row">
          <span class="stadium-text">${matchDate} • ${f.venue.name || 'Stadium'}</span>
          <span class="badge">${matchTime}</span>
        </div>
        <div class="team-header" style="justify-content: space-between; margin: 12px 0;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <img src="${h.logo}" class="team-logo" alt="${h.name}">
            <strong>${h.name}</strong>
          </div>
          <span style="color: #94a3b8; font-weight: bold;">VS</span>
          <div style="display: flex; align-items: center; gap: 8px;">
            <strong>${a.name}</strong>
            <img src="${a.logo}" class="team-logo" alt="${a.name}">
          </div>
        </div>
      </div>
    `;
  });
  html += `</div>`;
  container.innerHTML = html;
}

async function renderResultsView(container) {
  const results = await getRecentResults();

  if (!results || results.length === 0) {
    container.innerHTML = `<div class="placeholder-card"><p>No recent match results available.</p></div>`;
    return;
  }

  let html = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Home Team</th>
          <th>Score</th>
          <th>Away Team</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
  `;

  results.forEach(item => {
    const f = item.fixture;
    const h = item.teams.home;
    const a = item.teams.away;
    const goals = item.goals;
    const matchDate = new Date(f.date).toLocaleDateString();

    html += `
      <tr>
        <td>${matchDate}</td>
        <td><img src="${h.logo}" width="18"> <strong>${h.name}</strong></td>
        <td><span class="badge" style="background: #2563eb; color: #fff;">${goals.home} - ${goals.away}</span></td>
        <td><img src="${a.logo}" width="18"> <strong>${a.name}</strong></td>
        <td>${f.status.short}</td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

async function renderLeagueTableView(container) {
  const standings = await getLeagueStandings();

  let html = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Pos</th>
          <th>Club</th>
          <th>MP</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>GF:GA</th>
          <th>PTS</th>
        </tr>
      </thead>
      <tbody>
  `;

  standings.forEach(row => {
    html += `
      <tr>
        <td><strong>${row.rank}</strong></td>
        <td class="team-cell">
          <img src="${row.team.logo}" width="20" height="20">
          ${row.team.name}
        </td>
        <td>${row.all.played}</td>
        <td>${row.all.win}</td>
        <td>${row.all.draw}</td>
        <td>${row.all.lose}</td>
        <td>${row.all.goals.for}:${row.all.goals.against}</td>
        <td><strong>${row.points}</strong></td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

async function renderTeamFormView(container) {
  const teamsData = await getTeamsAndManagers();

  let html = `<div class="team-form-grid">`;
  
  teamsData.forEach(item => {
    const t = item.team;
    const v = item.venue;

    html += `
      <div class="team-card">
        <div class="team-header">
          <img src="${t.logo}" class="team-logo" alt="${t.name}">
          <div>
            <h3>${t.name}</h3>
            <p class="stadium-text">${v.name} (${v.city})</p>
          </div>
        </div>
        <div class="manager-info">
          <p><strong>Founded:</strong> ${t.founded || 'N/A'}</p>
          <div class="stat-row">
            <span>Capacity:</span>
            <strong>${v.capacity ? v.capacity.toLocaleString() : 'N/A'}</strong>
          </div>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}
