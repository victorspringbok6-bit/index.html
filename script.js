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

// Initialize app when DOM loads
document.addEventListener('DOMContentLoaded', async () => {
  const liveMatches = await fetchMatches();
  console.log('API-Sports Data Received:', liveMatches);

  // If no live matches are currently active, fall back or notify
  if (!liveMatches || liveMatches.length === 0) {
    console.log('No live matches currently playing.');
  } else {
    // Call your UI render function here with liveMatches
    // Example: renderMatchCards(liveMatches);
  }
});
