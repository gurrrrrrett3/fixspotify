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

let previousValues: {
  total?: number;
  track?: number;
  album?: number;
  artist?: number;
  playlist?: number;
} = {};

function formatNumber(number: number, decimalPlaces = 0): string {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimalPlaces,
    minimumFractionDigits: decimalPlaces,
    useGrouping: true,
    style: 'decimal'
  }).format(number).replace(/,/g, ' ');
}

function createAnimatedDigits(current: number, previous?: number): string {
  const currentStr = formatNumber(current);
  const previousStr = previous !== undefined ? formatNumber(previous) : currentStr;
  
  let container = '<section class="animated-number">';
  const maxLength = Math.max(currentStr.length, previousStr.length);
  const paddedCurrent = currentStr.padStart(maxLength, ' ');
  const paddedPrevious = previousStr.padStart(maxLength, ' ');
  
  const changedDigits = [];
  for (let i = 0; i < maxLength; i++) {
    if (paddedCurrent[i] !== paddedPrevious[i]) {
      changedDigits.push(i);
    }
  }
  
  for (let i = 0; i < maxLength; i++) {
    const currentDigit = paddedCurrent[i];
    const previousDigit = paddedPrevious[i];
    const hasChanged = currentDigit !== previousDigit;
    const staggerIndex = changedDigits.indexOf(i);
    const staggerDelay = staggerIndex >= 0 ? staggerIndex * 100 : 0;
    
    if (hasChanged) {
      if (currentDigit === ' ') {
        container += '<span class="digit-wrapper">&nbsp;</span>';
      } else {
        container += `
          <span class="digit-wrapper">
            <span class="digit digit-exit" style="animation-delay: ${staggerDelay}ms;">${previousDigit === ' ' ? '&nbsp;' : previousDigit}</span>
            <span class="digit digit-enter" style="animation-delay: ${staggerDelay}ms;">${currentDigit}</span>
          </span>
        `;
      }
    } else {
      container += `<span class="digit-wrapper"><span class="digit${currentDigit === ' ' ? ' digit-space' : ''}">${currentDigit === ' ' ? '&nbsp;' : currentDigit}</span></span>`;
    }
  }
  
  container += '</section>';
  return container;
}

async function fetchStats(): Promise<StatsData> {
  const response = await fetch('https://fixspotify.com/stats');
  return await response.json();
}

async function updateStats() {
  try {
    const data = await fetchStats();
    
    const stats = `
      <section class="stats">
        <section class="stats-title">
          <h2>Stats</h2>
        </section>
        <section class="stats-panel">
          <section class="stats-total">
            ${createAnimatedDigits(data.counts.total, previousValues.total)}
            <span>Total Requests</span>
          </section>
          <section class="stats-track">
            ${createAnimatedDigits(data.counts.track, previousValues.track)}
            <span>Track Requests</span>
          </section>
          <section class="stats-album">
            ${createAnimatedDigits(data.counts.album, previousValues.album)}
            <span>Album Requests</span>
          </section>
          <section class="stats-last">
            <a href="${data.lastRequests[0].url}">
              ${data.lastRequests[0].image ? `<img src="${data.lastRequests[0].type === "album" ? data.lastRequests[0].image.slice(24) : data.lastRequests[0].image}" alt="Cover of ${data.lastRequests[0].name} by ${data.lastRequests[0].description}" />` : ''}
              <section class="song-details">
                <span class="song-title">${data.lastRequests[0].name}</span>
                <span class="song-artist">${data.lastRequests[0].description}</span>
              </section>
              <span>Last Request</span>
            </a>
          </section>
        </section>
      </section>
    `;

    previousValues = {
      total: data.counts.total,
      track: data.counts.track,
      album: data.counts.album,
      artist: data.counts.artist,
      playlist: data.counts.playlist
    };
    
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