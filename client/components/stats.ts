import '../styles/stats.css'

interface StatsData {
  counts: {
    total: number;
    track: number;
    album: number;
    artist: number;
    playlist: number;
  };
  lastRequests: any[];
}

async function fetchStats(): Promise<StatsData> {
  const response = await fetch('https://fixspotify.com/stats');
  return await response.json();
}

async function updateStats() {
  try {
    const data = await fetchStats();
    console.log('Fetched stats:', data);
    const stats = `
      <section class="stats">
        <section class="stats-title">
          <span>Stats</span>
        </section>
        <section class="stats-panel">
          <section class="stats-total">
            <span>${data.counts.total}</span>
            <span>Total Requests</span>
          </section>
          <section class="stats-track">
            <span>${data.counts.track}</span>
            <span>Track Requests</span>
          </section>
          <section class="stats-last">
            <img src="${data.lastRequests[0].image}" alt="Last request Cover" />
            <section class="song-details">
              <span class="song-title" title="${data.lastRequests[0].name}">${data.lastRequests[0].name}</span>
              <span class="song-artist" title="${data.lastRequests[0].description}">${data.lastRequests[0].description}</span>
            </section>
            <span>Last Request</span>
          </section>
          <section class="stats-album">
            <span>${data.counts.album}</span>
            <span>Album Requests</span>
          </section>
        </section>
      </section>
    `;
    
    const statsContainer = document.getElementById('stats-container');
    if (statsContainer) {
      statsContainer.innerHTML = '';
      statsContainer.innerHTML = stats;
    }
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

let intervalId: number | null = null;

export function initStats(refreshInterval = 30000) {
  if (intervalId) {
    clearInterval(intervalId);
  }
  updateStats();
  intervalId = window.setInterval(updateStats, refreshInterval);
}

export function cleanupStats() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}