import { BaseWindow, BrowserWindow, session, WebContentsView } from "electron";
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
            prefix: "user-agent",
            executeCommand: function (args: string[]): void {
                console.info(session.defaultSession.getUserAgent())
            }
        },

        repoCommand(p),
        moduleInfoCommand(p),


    ]
}