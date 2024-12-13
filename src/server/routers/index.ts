import { Router } from 'express';
import { resolve } from 'path';
import SpotifyApiManager from '../../manager/spotifyApiManager.js';
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
    res.sendFile(resolve("./dist/client/pages/index.html"));
});

indexRouter.get("/track/:id", async (req, res) => {
    const previewURL = await SpotifyApiManager.getTrackAudioPreview(req.params.id);
    if (!previewURL) {
        res.status(404).send("Track not found");
        return;
    }

    res.redirect(previewURL);
})

export default indexRouter;