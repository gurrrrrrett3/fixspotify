import { NextFunction, Request, Response, Router } from 'express';
import { resolve } from 'path';
import TemplateManager from '../../manager/templateManager.js';
import SpotifyApiManager from '../../manager/spotifyApiManager.js';
const openRouter = Router();

openRouter.get("/", (req, res) => {
    res.sendFile(resolve("./dist/client/pages/index.html"));
});

// https://open.spotify.com/track/id
openRouter.get("/track/:id", async (req, res) => {
    res.send(TemplateManager.getTemplate("track", await SpotifyApiManager.getTrack(req.params.id)));
})

// https://open.spotify.com/album/id
openRouter.get("/album/:id", async (req, res) => {
    res.send(TemplateManager.getTemplate("album", await SpotifyApiManager.getAlbum(req.params.id)));
})

// https://open.spotify.com/playlist/id
openRouter.get("/playlist/:id", async (req, res) => {
    res.send(TemplateManager.getTemplate("playlist", await SpotifyApiManager.getPlaylist(req.params.id)));
})

// https://open.spotify.com/artist/id
openRouter.get("/artist/:id", async (req, res) => {
    res.send(TemplateManager.getTemplate("artist", await SpotifyApiManager.getArtist(req.params.id)));
})

export default openRouter;

