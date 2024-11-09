import { Server, createServer } from "http";
import express, { Application } from "express";
import { resolve } from "path";
import openRouter from "./routers/open/index.js";
import indexRouter from "./routers/index/index.js";

export default class Webserver {

    public static readonly PORT: number = parseInt(process.env.PORT || "3000");
    public static readonly OPEN_SUBDOMAIN = "open"

    public server: Server;
    public app: Application;

    constructor() {
        this.app = express();
        this.server = createServer(this.app);

        this.app.disable("x-powered-by");
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        /*
            We need to serve two subdomains:

            fixspotify.com
            open.fixspotify.com - handles actual embeds
            
        */

        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");

            if (req.hostname.startsWith(Webserver.OPEN_SUBDOMAIN + ".") || process.env.DEV_FORCE_OPEN === "true") {
                openRouter(req, res, next);
            } else {
                indexRouter(req, res, next);
            }
        })

        this.app.use("/_", express.static(resolve("./dist/client/_")))

    }

    public start(): void {
        this.server.listen(Webserver.PORT, () => {
            console.log(`Server started on port ${Webserver.PORT}`);
        });
    }

}