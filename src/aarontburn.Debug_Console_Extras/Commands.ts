import { BrowserWindow } from "electron";
import { DebugConsoleExtras } from "./DebugConsoleExtrasProcess";
import { repoCommand } from "./commands/repo";
import { moduleInfoCommand } from "./commands/module-info";

export type CommandCallback = (args: string[]) => void;
export const indent = (indentCount: number = 1) => ' '.repeat(2).repeat(indentCount);

export interface Command {
    prefix: string;
    executeCommand: (args: string[]) => void,
    documentation?: {
        shortDescription?: string;
        longDescription?: string;
    }
}

export function getCommands(process: DebugConsoleExtras): Command[] {
    return [
        {
            prefix: "devtools",
            executeCommand: function (args: string[]): void {
                BrowserWindow.getFocusedWindow()?.webContents.openDevTools();
                console.info("Opening devtools.\n")
            },
            documentation: {
                shortDescription: "Opens the web inspector."
            }
        },
        repoCommand(process),
        moduleInfoCommand(process),


    ]
}