import { BrowserWindow } from "electron";
import DebugConsoleExtras from "./main";
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

export function getCommands(p: DebugConsoleExtras): Command[] {
    return [
        {
            prefix: "devtools",
            executeCommand: function (args: string[]): void {
                if (args.includes("--detached")) {
                    BrowserWindow.getFocusedWindow()?.webContents.openDevTools({ mode: "detach" });
                } else {
                    BrowserWindow.getFocusedWindow()?.webContents.openDevTools();
                }

                console.info("Opening devtools.\n")
            },
            documentation: {
                shortDescription: "Opens the web inspector."
            }
        },
        {
            prefix: "argv",
            executeCommand: function (args: string[]): void {
                console.info(JSON.stringify(process.argv, undefined, 4) + "\n");
            },
            documentation: {
                shortDescription: "Lists all command-line arguments."
            }
        },
        repoCommand(p),
        moduleInfoCommand(p),


    ]
}