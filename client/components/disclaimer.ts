export function injectDisclaimer() {
  const disclaimer = `
    <span class="disclaimer">This tool is not affiliated with Spotify.</span>
  `;
  const disclaimerContainer = document.getElementById('disclaimer-container');
  if (disclaimerContainer) {
      disclaimerContainer.innerHTML = disclaimer;
  }
}
injectDisclaimer();