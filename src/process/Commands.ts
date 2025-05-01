import DebugConsoleExtras from "./main";
import { repoCommand } from "./commands/repo";
import { moduleInfoCommand } from "./commands/module-info";
import { testIMCCommand } from "./commands/test-imc";

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
        repoCommand(p),
        moduleInfoCommand(p),
        testIMCCommand(p)
    ]
}