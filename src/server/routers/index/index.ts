import { Router } from 'express';
import { resolve } from 'path';
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
    res.sendFile(resolve("./dist/client/pages/index.html"));
});

export default indexRouter;