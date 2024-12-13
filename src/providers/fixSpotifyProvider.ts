import Provider, { ProviderOptions, ProviderType } from "../classes/provider.js";

export default class FixSpotifyProvider extends Provider {
    public readonly id = "fixSpotify";
    public readonly name = "fixSpotify";
    public readonly color = "#1DB954";
    public readonly icon = "spotify";
    public readonly disabled = false;
    public readonly supports = [ProviderType.Track, ProviderType.Album, ProviderType.Artist, ProviderType.Playlist];

    public async get(type: ProviderType, options: ProviderOptions): Promise<string | undefined> {
        return `https://open.fixspotify.com/view?type=${type}&id=${options.id}`
    }

    // unused
    public async search(query: string): Promise<string | undefined> {
        return undefined;
    }
}
