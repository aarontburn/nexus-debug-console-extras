import { Process, IPCCallback, Setting } from "@nexus/nexus-module-builder"
import { getCommands } from "./Commands";


export class DebugConsoleExtras extends Process {

    private static readonly MODULE_NAME: string = "Debug Console Extras";
    private static readonly MODULE_ID: string = "aarontburn.Debug_Console_Extras";

    public constructor(ipcCallback: IPCCallback) {
        super(
            DebugConsoleExtras.MODULE_ID,
            DebugConsoleExtras.MODULE_NAME,
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