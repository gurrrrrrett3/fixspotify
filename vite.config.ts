import { defineConfig } from "vite";
import { readdirSync } from "fs";
import { resolve } from "path";

const pagesDir = resolve(__dirname, "client/pages");
const pages = readdirSync(pagesDir).map(page => page.replace(".html", ""));

const routes: Record<string, string> = {};

for (const page of pages) {
    routes[page] = `client/pages/${page}.html`;
}


export default defineConfig({
    root: "client",
    build: {
        target: "esnext",
        outDir: "../dist/client",
        assetsDir: "_",
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            // input: "client/index.html",
            input: routes,
        }
    },
    server: {
        open: true,
        proxy: {
            '/api': 'http://localhost:3000'
        }
    }
});