import { providers } from "./providers.ts"
const providerList = document.getElementById("providerlist") as HTMLDivElement;

let selectedProvider = localStorage.getItem("provider") || "fixspotify";

function drawProviders() {
    providerList.innerHTML = "";
    Object.keys(providers).forEach(providerName => {
        const provider = providers[providerName];
        const selected = selectedProvider === providerName;
        const providerElement = document.createElement("div");
        providerElement.className = "provider";
        providerElement.setAttribute("style", `---color: ${provider.color}`);
        providerElement.innerHTML = [
            `<img height="32" width="32" src="https://cdn.simpleicons.org/${provider.icon}/${selected ? "000" : provider.color.replace("#", "")}"></i>`,
            `<p>${provider.name}</p>`,
            provider.disabled ? `<p>Coming soon!</p>` : ""
        ].join("");

        if (selected) {
            providerElement.classList.add("selected");
        }

        if (provider.disabled) {
            providerElement.classList.add("disabled");
        } else {
            providerElement.onclick = () => {
                localStorage.setItem("provider", providerName);
                selectedProvider = providerName;
                drawProviders();
            }
        }

        providerList.appendChild(providerElement);
    })
}

drawProviders();