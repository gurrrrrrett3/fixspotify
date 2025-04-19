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
  const response = await fetch('/stats');
  return await response.json();
}

export async function initStats() {
  try {
    const data = await fetchStats();
    const stats = `
      <section class="stats">
        <section class="stats-title">
          <span>stats</span>
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
          <section class="stats-album">
            <span>${data.counts.album}</span>
            <span>Album Requests</span>
          </section>
          <section class="stats-artist">
            <span>${data.counts.artist}</span>
            <span>Artist Requests</span>
          </section>
        </section>
      </section>
    `;
    
    const statsContainer = document.getElementById('stats-container');
    if (statsContainer) {
      statsContainer.innerHTML = stats;
    }
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

initStats();