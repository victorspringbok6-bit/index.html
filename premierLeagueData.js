/**
 * Apex Analytics - Live API Data Engine
 * Provider: API-Sports (v3.football.api-sports.io)
 */

// Replace with your newly generated key from API-Sports
const API_KEY = "33fc57f6057894568236abd71b94c8aa"; 
const BASE_URL = "https://v3.football.api-sports.io";
const LEAGUE_ID = 39; // Premier League
const CURRENT_SEASON = 2026;

// Local Memory Cache to minimize API quota usage
const cache = {};

async function fetchFromAPI(endpoint) {
  if (cache[endpoint]) {
    return cache[endpoint];
  }

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        "x-apisports-key": API_KEY
      }
    });

    const data = await response.json();
    
    if (data.errors && Object.keys(data.errors).length > 0) {
      console.error("API Error:", data.errors);
      return [];
    }

    cache[endpoint] = data.response;
    return data.response;
  } catch (error) {
    console.error("Fetch Exception:", error);
    return [];
  }
}

/**
 * Public API Methods used by script.js
 */
export async function getUpcomingFixtures() {
  return await fetchFromAPI(`fixtures?league=${LEAGUE_ID}&season=${CURRENT_SEASON}&next=10`);
}

export async function getRecentResults() {
  return await fetchFromAPI(`fixtures?league=${LEAGUE_ID}&season=${CURRENT_SEASON}&last=10`);
}

export async function getLeagueStandings() {
  const response = await fetchFromAPI(`standings?league=${LEAGUE_ID}&season=${CURRENT_SEASON}`);
  return response[0]?.league?.standings[0] || [];
}

export async function getTeamsAndManagers() {
  return await fetchFromAPI(`teams?league=${LEAGUE_ID}&season=${CURRENT_SEASON}`);
}
