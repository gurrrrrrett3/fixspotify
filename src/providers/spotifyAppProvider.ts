import Provider, { ProviderOptions, ProviderType } from "../classes/provider.js";
import SpotifyApiManager from "../manager/spotifyApiManager.js";

export default class SpotifyProvider extends Provider {
    public readonly id = "spotifyapp";
    public readonly name = "Spotify";
    public readonly color = "#1DB954";
    public readonly icon = "spotify";
    public readonly disabled = false;
    public readonly supports = [ProviderType.Track, ProviderType.Album, ProviderType.Artist, ProviderType.Playlist];

    public async get(type: ProviderType, options: ProviderOptions): Promise<string | undefined> {
        return `spotify:${type}:${options.id}`
    }

    // unused
    public async search(query: string): Promise<string | undefined> {
        return undefined;
    }
}