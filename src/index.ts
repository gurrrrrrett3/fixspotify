import "dotenv/config";
import Webserver from "./server/index.js";
import TemplateManager from "./manager/templateManager.js";
import SpotifyApiManager from "./manager/spotifyApiManager.js";
import ProviderManager from "./manager/providerManager.js";

const server = new Webserver();

server.start();
TemplateManager.loadTemplates();
SpotifyApiManager.init();
ProviderManager.loadProviders();