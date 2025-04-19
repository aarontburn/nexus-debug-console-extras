import { DataResponse, HTTPStatusCodes, Process, Setting } from "@nexus/nexus-module-builder"
import { getCommands } from "./Commands";

const MODULE_ID: string = "{EXPORTED_MODULE_ID}";
const MODULE_NAME: string = "{EXPORTED_MODULE_NAME}";


export default class DebugConsoleExtras extends Process {

    public constructor() {
        super({
            moduleID: MODULE_ID,
            moduleName: MODULE_NAME,
        });
    }


    public async initialize(): Promise<void> {
        await super.initialize(); // This should be called.

        this.registerCommands();
    }

    private async registerCommands() {
        for (const command of getCommands(this)) {
            const response: DataResponse = await this.requestExternal("aarontburn.Debug_Console", "addCommandPrefix", command);
            if (response.code !== HTTPStatusCodes.OK) {
                console.error(response.body);
            }
        }

    }


    public registerSettings(): (Setting<unknown> | string)[] {
        return [];
    }


    public async onSettingModified(modifiedSetting: Setting<unknown>): Promise<void> {

    }

    public async handleEvent(eventType: string, data: any[]): Promise<any> {
        switch (eventType) {
            default: {
                console.log(`Unhandled event: type: ${eventType} | data: ${data}`);
            }
        }
    }

}