import Provider from "../classes/provider.js";

export default class TidalProvider extends Provider {
    public readonly id = "tidal";
    public readonly name = "Tidal";
    public readonly color = "#ffffff";
    public readonly icon = "tidal";
    public readonly disabled = true;
    public readonly supports = [];

    public async search(query: string): Promise<string | undefined> {
        return undefined;
    }
}
