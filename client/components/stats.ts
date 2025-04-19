export function injectStats() {
  const stats = `
    <section class="stats">
      <section class="stats-title">
        <span>Last 30 days</span>
      </section>
      <section class="stats-panel">
        <section class="stats-visitors">
          <span>21.9k</span>
          <span>Unique Visitors</span>
        </section>
        <section class="stats-requests">
          <span>467.98k</span>
          <span>Total Requests</span>
        </section>
      </section>
    </section>
  `;
  const statsContainer = document.getElementById('stats-container');
  if (statsContainer) {
    statsContainer.innerHTML = stats;
  }
}
injectStats();