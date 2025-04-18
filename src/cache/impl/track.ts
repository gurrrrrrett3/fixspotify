import UpdateableCache from "../updatableCache.js";
import SpotifyApiManager from "../../manager/spotifyApiManager.js";

export interface MinimalTrack {
    id: string;
    name: string;
    artists: string;
    duration: string;
    album: string;
    albumArt: string;
    totalTracks: number;
    trackNumber: number;
    releaseDate: string;
    url: string;
}

export const TrackCache = new UpdateableCache<MinimalTrack>(async (id: string) => {
    const track = await SpotifyApiManager.client.tracks.get(id);

    if (!track) {
        return null;
    }

    return {
        id: track.id,
        name: track.name,
        artists: SpotifyApiManager.formatArtists(track.artists),
        duration: SpotifyApiManager.formatDuration(track.duration!),
        album: track.album!.name,
        albumArt: track.album!.images ? track.album!.images[0].url.split("/").pop()! : "",
        images: track.album!.images.map((image) => image.url.split("/").pop()!),
        totalTracks: track.album!.totalTracks,
        trackNumber: track.trackNumber
            ? track.trackNumber : 0,
        releaseDate: SpotifyApiManager.formatDate(track.album!.releaseDate, track.album!.releaseDatePrecision),
        url: track.externalURL.spotify
    }
}, {
    staleDataThreshold: -1,
});

