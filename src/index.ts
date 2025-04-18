import "dotenv/config";
import Webserver from "./server/index.js";
import TemplateManager from "./manager/templateManager.js";
import SpotifyApiManager from "./manager/spotifyApiManager.js";
import ProviderManager from "./manager/providerManager.js";
import AnalyticsManager from "./analytics/analyticsManager.js";

const server = new Webserver();

server.start();
TemplateManager.loadTemplates();
SpotifyApiManager.init();
ProviderManager.loadProviders();

if (process.env.ANALYTICS_ENABLED === "true") {
    AnalyticsManager.init(process.env.ANALYTICS_INSTANCE_ID as string);
}

export const maintenanceMode = process.env.MAINTENANCE_MODE === "true" || false;
