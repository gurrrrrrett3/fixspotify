import '../styles/nav.css'
import fixspotify from '../assets/icons/fixspotify.svg';

export function initNav() {
  const nav = `
    <nav>
      <a href="https://fixspotify.com" class="logo">
        <span>fixSpotify</span>
        <img src="${fixspotify}" alt="fixSpotify SVG Logo" />
      </a>
      <ul class="nav-menu">
        <li><a href="https://open.fixspotify.com" class="nav-link">Config</a></li>
        <li><a href="https://gart.sh/l/fixspotify" class="nav-link" target="_blank">Source</a></li>
      </ul>
    </nav>
  `;
  const navContainer = document.getElementById('nav-container');
  if (navContainer) {
    navContainer.innerHTML = nav;
    const currentPath = window.location.pathname;
    const links = navContainer.querySelectorAll('.nav-link');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.endsWith(currentPath)) {
        link.classList.add('active');
      }
    });
  }

}
initNav();