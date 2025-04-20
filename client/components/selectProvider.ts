import '../styles/providers.css'
import { providers } from '../scripts/providers.ts'

let selectedProvider = localStorage.getItem("provider") || "FixSpotify";

export function initSelectProvider() {
  const sectionElement = document.createElement('section');
  sectionElement.className = 'select-provider';
  const h2Element = document.createElement('h2');
  h2Element.textContent = 'Preferred platform';
  const ulElement = document.createElement('ul');
  ulElement.className = 'providers-list';

  const providersList = Object.entries(providers)
    .filter(([_, provider]) => !provider.disabled)
    .map(([_, provider]) => {
      const providerElement = document.createElement("li");
      providerElement.className = "provider-item";
      providerElement.setAttribute("style", `--providerColor: ${provider.color}`);

      if (selectedProvider === provider.name) {
        providerElement.classList.add("selected");
      }

      if (!provider.disabled) {
        providerElement.onclick = () => {
          localStorage.setItem("provider", provider.name);
          selectedProvider = provider.name;
          initSelectProvider();
        }
      }

      providerElement.innerHTML = `
        <img src="${provider.icon}" alt="${provider.name} icon">
        <span>${provider.name}</span>
      `;

      return providerElement;
    });

  ulElement.append(...providersList);
  sectionElement.appendChild(h2Element);
  sectionElement.appendChild(ulElement);

  const selectProviderContainer = document.getElementById('select-provider-container');
  if (selectProviderContainer) {
    selectProviderContainer.innerHTML = '';
    selectProviderContainer.appendChild(sectionElement);
  }
}
initSelectProvider();