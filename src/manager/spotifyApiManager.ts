import { Artist, Client } from "spotify-api.js";

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

    public static mergeArtistNames(artists: Artist[] | undefined): string {
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

    public static formatArtistUrls(artists: Artist[] | undefined): string {
        if (!artists) {
            return "";
        }

        return artists.map(artist => `[View ${artist.name}](${artist.externalURL.spotify})`).join(" • ");
    }


    public static async getTrack(id: string): Promise<any> {
        const track = await this.client.tracks.get(id);

        console.log(track);

        return {
            title: track?.name,
            artist: this.mergeArtistNames(track?.artists),
            album: track?.album!.name,
            image: track?.album!.images[0].url,
            url: track?.externalURL.spotify,
            duration: Math.round(track?.duration! / 1000),
            description: [
                `Track ${track?.trackNumber} of ${track?.album?.totalTracks} on ${track?.album!.name}`,
                `Released on ${this.reformatDate(track?.album!.releaseDate!, track?.album!.releaseDatePrecision!)}`,
                `[Listen on Spotify](${track?.externalURL.spotify}) • [Listen to Preview](${track?.previewURL})`,
                `[View ${track?.album?.name}](${track?.album?.externalURL.spotify}) • ${this.formatArtistUrls(track?.artists)}`
            ].join("\n")
        }

    }



}