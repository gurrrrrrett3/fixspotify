export function injectSocials() {
  const socials = `
    <ul>
      <li>GitHub</li>
      <li>Email</li>
    </ul>
  `;
  const socialsContainer = document.getElementById('socials-container');
  if (socialsContainer) {
    socialsContainer.innerHTML = socials;
  }
}
injectSocials();