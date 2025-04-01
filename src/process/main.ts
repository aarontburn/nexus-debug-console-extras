import { Process, IPCCallback, Setting } from "@nexus/nexus-module-builder"
import { getCommands } from "./Commands";


const MODULE_NAME: string = "{EXPORTED_MODULE_NAME}";
const MODULE_ID: string = "{EXPORTED_MODULE_ID}";


export default class DebugConsoleExtras extends Process {

    public constructor(ipcCallback: IPCCallback) {
        super(
            MODULE_ID,
            MODULE_NAME,
            undefined,
            ipcCallback);

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
        if (modifiedSetting.getAccessID() === 'sample_bool') {

        }
    }

    public async handleEvent(eventType: string, data: any[]): Promise<any> {
        switch (eventType) {
            default: {
                console.log(`Unhandled event: type: ${eventType} | data: ${data}`);
            }
        }
    }

}