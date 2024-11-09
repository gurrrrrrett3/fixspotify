import { readdirSync, readFileSync } from "fs"
import { resolve } from "path"

export default class TemplateManager {
    public static templates: Record<string, string> = {}
    public static readonly sharedHead = readFileSync(resolve("./src/templates/misc/sharedHead.html"), "utf-8")

    public static loadTemplates(): void {
        const pagesDir = resolve("./src/templates/pages")
        const pages = readdirSync(pagesDir).map(page => page.replace(".html", ""))

        for (const page of pages) {
            TemplateManager.templates[page] = readFileSync(resolve(pagesDir, `${page}.html`), "utf-8")

            console.log(`Loaded template: ${page}`)
        }
    }

    public static getTemplate(name: string, data: Record<string, string> = {}): string {
        if (!TemplateManager.templates[name]) {
            throw new Error(`Template ${name} not found`)
        }

        data["sharedHead"] = TemplateManager.sharedHead

        let template = TemplateManager.templates[name]

        for (const key in data) {
            template = template.replace(new RegExp(`{{${key}}}`, "g"), data[key])
        }

        return template
    }


}