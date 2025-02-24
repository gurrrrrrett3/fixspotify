import SpotifyApiManager from "../../manager/spotifyApiManager.js";
import UpdateableCache from "../updatableCache.js";

export interface MinimalAlbum {
    id: string;
    name: string;
    artists: string;
    releaseDate: string;
    totalTracks: number;
    tracks: AlbumTrack[];
    genres?: string
    url: string;
    art: string;
    images: string[];
}

export interface AlbumTrack {
    id: string;
    name: string;
    artists: string;
    duration: string;
}

export const AlbumCache = new UpdateableCache<MinimalAlbum>(async (id: string) => {
    const album = await SpotifyApiManager.client.albums.get(id);

    if (!album) {
        return null;
    }

    return {
        id: album.id,
        name: album.name,
        artists: SpotifyApiManager.formatArtists(album.artists),
        releaseDate: SpotifyApiManager.formatDate(album?.releaseDate!, album.releaseDatePrecision!),
        totalTracks: album.totalTracks,
        genres: album.genres?.join(", "),
        tracks: album.tracks?.map((track) => {
            return {
                id: track.id,
                name: track.name,
                duration: SpotifyApiManager.formatDuration(track.duration),
                artists: SpotifyApiManager.formatArtists(track.artists)
            }
        }) || [],
        url: album.externalURL.spotify,
        art: album.images[0].url,
        images: album.images.map((image) => image.url.split("/").pop()!)
    }
});
