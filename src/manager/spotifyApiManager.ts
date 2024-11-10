import { Artist, Client, Track } from "spotify-api.js";

export default class SpotifyApiManager {

    public static client: Client;

    public static async init(): Promise<void> {
        this.client = new Client({
            token: {
                clientID: process.env.SPOTIFY_CLIENT_ID as string,
                clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string
            }
        });
    }

    public static formatArtists(artists: Artist[] | undefined): string {
        if (!artists) {
            return "";
        }

        return artists.map(artist => artist.name).join(", ");
    }

    public static formatDuration(duration: number): string {
        const minutes = Math.floor(duration / 60000);
        const seconds = ((duration % 60000) / 1000).toFixed(0);

        return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
    }

    public static formatNumber(number: number, precision: number = 2): string {
        const units = ["", "K", "M", "B", "T"];

        let unit = Math.floor((number.toFixed(0).length - 1) / 3) * 3;
        let num = number / Math.pow(10, unit);

        return num.toFixed(precision) + units[unit / 3];
    }

    public static reformatDate(date: string, datePrecision: string): string {
        const [year, month, day] = date.split("-");
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        switch (datePrecision) {
            case "year":
                return year;
            case "month":
                return `${monthNames[parseInt(month) - 1]} ${year}`;
            case "day":
                return `${monthNames[parseInt(month) - 1]} ${day}, ${year}`;
            default:
                return "";
        }
    }

    public static async getTrack(id: string): Promise<any> {
        const track = await this.client.tracks.get(id);

        if (!track) {
            return null;
        }

        return {
            id: track.id,
            title: track.name,
            artist: this.formatArtists(track.artists),
            album: track.album!.name,
            image: track.album!.images[0].url,
            url: track.externalURL.spotify,
            description: [
                `By ${this.formatArtists(track.artists)} • ${this.formatDuration(track.duration!)}`,
                track.album?.totalTracks == 1 ? `Single` : `Track ${track.trackNumber} of ${track.album!.totalTracks} on ${track.album!.name}`,
                `Released on ${this.reformatDate(track.album!.releaseDate, track.album!.releaseDatePrecision)}`
            ].join("\n")
        }

    }

    public static async getAlbum(id: string): Promise<any> {
        const album = await this.client.albums.get(id);

        if (!album) {
            return null;
        }

        return {
            id: album.id,
            title: album.name,
            artist: this.formatArtists(album.artists),
            image: album.images[0].url,
            url: album.externalURL.spotify,
            description: [
                `By ${this.formatArtists(album.artists)}`,
                `Released on ${this.reformatDate(album?.releaseDate!, album.releaseDatePrecision!)}`,
                `${album.totalTracks} tracks`,
                `${album.genres?.join(", ")}`,
                ...album.tracks?.slice(0, 10).map((track, index) => {
                    return `${index + 1}. ${track.name} • ${this.formatDuration(track.duration)}`
                }) || "",
                '',
                album.tracks?.length! > 10 ? `${album.tracks?.length! - 10} more...` : ""
            ].join("\n")
        }
    }

    public static async getPlaylist(id: string): Promise<any> {
        const [playlist, playlistTracks] = await Promise.all([
            this.client.playlists.get(id),
            this.client.playlists.getTracks(id, {
                limit: 5
            })
        ])

        if (!playlist) {
            return null;
        }


        const tracks = (await this.client.tracks.getMultiple(playlistTracks.map(track => track.track!.id))).reduce((acc, track) => {
            acc[track.id] = track;
            return acc;
        }, {} as Record<string, Track>)

        return {
            id: playlist.id,
            title: playlist.name,
            description: [
                playlist.description,
                `By ${playlist.owner.displayName}`,
                `${playlist.totalTracks} tracks`,
                '',
                ...playlistTracks.map((playlistTrack, index) => {
                    if (!playlistTrack.track || playlistTrack.track.type == "episode") {
                        return "";
                    }
                    let track = tracks[playlistTrack.track?.id];
                    return `${index + 1}. ${playlistTrack.track?.name} • ${this.formatArtists(track.artists)} • ${this.formatDuration(track.duration)}`
                }),
                '',
                playlist.totalTracks > 5 ? `${playlist.totalTracks - 5} more...` : ""
            ].join("\n"),
            image: playlist.images[0].url,
            url: playlist.externalURL.spotify
        }
    }

    public static async getArtist(id: string): Promise<any> {
        const artist = await this.client.artists.get(id);

        if (!artist) {
            return null;
        }

        return {
            id: artist.id,
            title: artist.name,
            description: [
                artist.genres?.join(", "),
                `${this.formatNumber(artist.totalFollowers!)} followers`,
                `${artist.popularity}% popularity`
            ].join("\n"),
            image: artist.images![0].url,
            url: artist.externalURL.spotify
        }
    }

}