import { Router } from 'express';
import { resolve } from 'path';
import SpotifyApiManager from '../../manager/spotifyApiManager.js';
import { TrackCache } from '../../cache/impl/track.js';
import { AlbumCache } from '../../cache/impl/album.js';
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
    res.sendFile(resolve("./dist/client/pages/index.html"));
    // res.sendFile(resolve("./dist/client/pages/down.html"));
});

indexRouter.get("/cache", (req, res) => {
    res.json({
        tracks: TrackCache.info(),
        albums: AlbumCache.info()
    })
})

indexRouter.get("/robots.txt", (req, res) => {
    res.sendFile(resolve("./client/assets/robots.txt"));
})

export default indexRouter;