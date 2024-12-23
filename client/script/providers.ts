export const providers = {
    fixSpotify: {
        name: "FixSpotify (default)",
        color: "#1DB954",
        icon: "spotify",
    },
    spotify: {
        name: "Spotify",
        color: "#1DB954",
        icon: "spotify",
    },
    spotifyapp: {
        name: "Spotify (Open in app)",
        color: "#1DB954",
        icon: "spotify",
    },
    youtube: {
        name: "YouTube",
        color: "#FF0000",
        icon: "youtube",
    },
    youtubeMusic: {
        name: "YouTube Music",
        color: "#FF0000",
        icon: "youtube",
    },
    tidal: {
        name: "Tidal",
        color: "#ffffff",
        icon: "tidal",
        disabled: true,
    },
    soundcloud: {
        name: "SoundCloud",
        color: "#FF5500",
        icon: "soundcloud",
        disabled: true,
    },
    appleMusic: {
        name: "Apple Music",
        color: "#FA243C",
        icon: "applemusic",
        disabled: true,
    },
    amazonMusic: {
        name: "Amazon Music",
        color: "#46C3D0",
        icon: "amazonmusic",
        disabled: true,
    },
    pandora: {
        name: "Pandora",
        color: "#005483",
        icon: "pandora",
        disabled: true,
    },
    musicbrainz: {
        name: "MusicBrainz",
        color: "#BA478F",
        icon: "musicbrainz",
        disabled: true,
    },
} as Record<string, { name: string, color: string, icon: string, disabled?: true }>;
