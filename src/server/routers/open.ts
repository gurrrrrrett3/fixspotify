import { NextFunction, Request, Response, Router } from 'express';
import { resolve } from 'path';
import TemplateManager from '../../manager/templateManager.js';
import SpotifyApiManager from '../../manager/spotifyApiManager.js';
import ProviderManager from '../../manager/providerManager.js';
import Provider, { ProviderType } from '../../classes/provider.js';
import fetch from 'node-fetch';
const openRouter = Router();

openRouter.get("/", (req, res) => {
    res.sendFile(resolve("./dist/client/pages/config.html"));
});

openRouter.get("/view", (req, res) => {
    res.sendFile(resolve("./dist/client/pages/view.html"));
})

// https://open.spotify.com/track/id
openRouter.get("/track/:id", async (req, res) => {
    res.send(TemplateManager.getTemplate("track", await SpotifyApiManager.getTrackEmbed(req.params.id)));
})

// https://open.spotify.com/album/id
openRouter.get("/album/:id", async (req, res) => {
    res.send(TemplateManager.getTemplate("album", await SpotifyApiManager.getAlbumEmbed(req.params.id)));
})

// https://open.spotify.com/playlist/id
openRouter.get("/playlist/:id", async (req, res) => {
    res.send(TemplateManager.getTemplate("playlist", await SpotifyApiManager.getPlaylistEmbed(req.params.id)));
})

// https://open.spotify.com/artist/id
openRouter.get("/artist/:id", async (req, res) => {
    res.send(TemplateManager.getTemplate("artist", await SpotifyApiManager.getArtistEmbed(req.params.id)));
})

// handles redirecting to a provider
openRouter.get("/redirect/:provider/:type/:id", async (req, res) => {
    const provider = req.params.provider;

    if (!ProviderManager.validateProvider(provider)) {
        res.status(400).send("Invalid provider");
        return;
    }

    const type = req.params.type;
    if (!Provider.validateType(type)) {
        res.status(400).send("Invalid type");
        return;
    }

    const url = await ProviderManager.getUrl(type, provider, req.params.id);

    if (!url) {
        res.status(404).sendFile(resolve("./dist/client/pages/error.html"));
        return;
    }

    res.redirect(url);
})

// get info
openRouter.get("/api", async (req, res) => {
    res.json({
        version: process.env.npm_package_version,
        providers: ProviderManager.providers
    });
})


// get media info
openRouter.get("/api/info/:type/:id", async (req, res) => {
    const type = req.params.type;
    if (!Provider.validateType(type)) {
        res.status(400).send("Invalid type");
        return;
    }

    const id = req.params.id;

    switch (type) {
        case ProviderType.Track:

            const track = await SpotifyApiManager.client.tracks.get(id)

            if (!track) {
                res.status(404).send("Track not found");
                return;
            }

            res.json({
                name: track.name,
                artists: track.artists.map(artist => artist.name).join(", "),
                album: track.album?.name,
                images: track.album?.images.map((image) => {
                    return `/api/image/${image.url.split("/").pop()}`;
                })
            });
            break;
        case ProviderType.Album:
            const album = await SpotifyApiManager.client.albums.get(id);

            if (!album) {
                res.status(404).send("Album not found");
                return;
            }

            res.json({
                name: album.name,
                artists: album.artists.map(artist => artist.name).join(", "),
                images: album.images.map((image) => {
                    return `/api/image/${image.url.split("/").pop()}`;
                }),
                tracks: album.tracks?.map((track) => {
                    return {
                        id: track.id,
                        name: track.name,
                        artists: track.artists.map(artist => artist.name).join(", "),
                        duration: track.duration
                    }
                })
            });

            break;
        case ProviderType.Artist:

            const artist = await SpotifyApiManager.client.artists.get(id);

            if (!artist) {
                res.status(404).send("Artist not found");
                return;
            }

            res.json({
                name: artist.name,
                genres: artist.genres?.join(", "),
                images: artist.images?.map((image) => {
                    return `/api/image/${image.url.split("/").pop()}`;
                })
            });

            break;
        case ProviderType.Playlist:

            const playlist = await SpotifyApiManager.client.playlists.get(id);

            if (!playlist) {
                res.status(404).send("Playlist not found");
                return;
            }

            res.json({
                name: playlist.name,
                description: playlist.description,
                images: playlist.images.map((image) => {
                    return `/api/image/${image.url.split("/").pop()}`;
                })
            });

            break;
    }
})

// get image
openRouter.get("/api/image/:id", async (req, res) => {
    const id = req.params.id;
    const imageRes = await fetch(`https://i.scdn.co/image/${id}`);
    const imageBuffer = await imageRes.buffer();
    res.setHeader("Content-Type", "image/jpeg");
    res.send(imageBuffer);
})

// get provider list
openRouter.get("/api/providers", async (req, res) => {
    res.json(ProviderManager.providers);
})

export default openRouter;

