import { Router } from 'express';
import { resolve } from 'path';
import { TrackCache } from '../../cache/impl/track.js';
import { AlbumCache } from '../../cache/impl/album.js';
import { maintenanceMode } from '../../index.js';
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
    if (maintenanceMode) {
        res.sendFile(resolve("./dist/client/pages/down.html"));
        return
    }

    res.sendFile(resolve("./dist/client/pages/index.html"));
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