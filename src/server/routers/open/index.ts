import { NextFunction, Request, Response, Router } from 'express';
import { resolve } from 'path';
import TemplateManager from '../../../manager/templateManager.js';
import SpotifyApiManager from '../../../manager/spotifyApiManager.js';
const openRouter = Router();

openRouter.get("/", (req, res) => {
    res.sendFile(resolve("./dist/client/pages/index.html"));
});

// https://open.spotify.com/track/id
openRouter.get("/track/:id", async (req, res) => {

    res.send(TemplateManager.getTemplate("track", await SpotifyApiManager.getTrack(req.params.id)));
})

export default openRouter;

