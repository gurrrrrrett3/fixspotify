import { resolve } from "path";
import Provider, { ProviderType } from "../classes/provider.js";
import { readdirSync } from "fs";
import SpotifyApiManager from "./spotifyApiManager.js";

export default class ProviderManager {
    public static providers: Record<string, Provider> = {}

    public static async loadProviders(): Promise<void> {
        // Load providers from providers directory
        const providersDir = resolve("./dist/providers")
        const providerFiles = readdirSync(providersDir).filter(file => file.endsWith(".js"))

        for (const file of providerFiles) {
            const provider = new (await import(resolve(providersDir, file))).default as Provider
            console.log(`Loaded provider ${provider.id}`)
            ProviderManager.providers[provider.id] = provider
        }
    }

    public static validateProvider(provider: string): boolean {
        return !!ProviderManager.providers[provider]
    }

    public static async getUrl(type: ProviderType, provider: string, id: string): Promise<string | undefined> {
        if (!ProviderManager.providers[provider]) return undefined;

        switch (type) {
            case ProviderType.Track: {
                const track = await SpotifyApiManager.client.tracks.get(id)
                if (!track) return undefined;

                return ProviderManager.providers[provider].get(type, {
                    name: track.name,
                    artist: track.artists[0].name,
                    id
                })
            }
            case ProviderType.Album: {
                const album = await SpotifyApiManager.client.albums.get(id)
                if (!album) return undefined;

                return ProviderManager.providers[provider].get(type, {
                    name: album.name,
                    artist: album.artists[0].name,
                    id
                })
            }
            case ProviderType.Artist: {
                const artist = await SpotifyApiManager.client.artists.get(id)
                if (!artist) return undefined;

                return ProviderManager.providers[provider].get(type, {
                    name: artist.name,
                    id
                })
            }
            case ProviderType.Playlist: {
                const playlist = await SpotifyApiManager.client.playlists.get(id)
                if (!playlist) return undefined;

                return ProviderManager.providers[provider].get(type, {
                    id
                })
            }

        }

    }

}