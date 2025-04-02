import { Process, Setting } from "@nexus/nexus-module-builder"
import { getCommands } from "./Commands";

const MODULE_ID: string = "{EXPORTED_MODULE_ID}";
const MODULE_NAME: string = "{EXPORTED_MODULE_NAME}";


export default class DebugConsoleExtras extends Process {

    public constructor() {
        super(MODULE_ID, MODULE_NAME, undefined);
    }


    public initialize(): void {
        super.initialize(); // This should be called.

        for (const command of getCommands(this)) {
            this.requestExternal("aarontburn.Debug_Console", "addCommandPrefix", command);
        }

    }


    public registerSettings(): (Setting<unknown> | string)[] {
        return [];
    }


    public refreshSettings(modifiedSetting: Setting<unknown>): void {

    }

    public async handleEvent(eventType: string, data: any[]): Promise<any> {
        switch (eventType) {
            default: {
                console.log(`Unhandled event: type: ${eventType} | data: ${data}`);
            }
        }
    }

}