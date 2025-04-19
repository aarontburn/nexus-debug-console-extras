import { DIRECTORIES } from "@nexus/nexus-module-builder";
import { Command, indent } from "../Commands";
import DebugConsoleExtras from "../main";
import * as path from "path";
import * as fs from "fs";


export const moduleInfoCommand = (process: DebugConsoleExtras): Command => {
    return {
        prefix: "module-info",
        executeCommand: (args: string[]) => executeCommand(process, args),
        documentation: {
            shortDescription: "Displays the info, if possible, of a module.",
            longDescription: `
Usage: module-info <moduleID>

        - Displays the information provided by the modules 'module-info.json', if applicable.

        Example:
        >> module-info aarontburn.Debug_Console_Extras `
        }
    }
}


const redirectToMainPage: string[] = [
    'nexus.Home',
    'nexus.Settings',
    'nexus.Main'
]

export async function executeCommand(process: DebugConsoleExtras, args: string[]): Promise<void> {
    const moduleID: string | undefined = args[1];
    if (moduleID === undefined) {
        console.error(`Missing module ID. Usage: 'module-info <moduleID>'\n`);
        return;
    }
    if (redirectToMainPage.includes(moduleID)) {
        // something
        // console.info(link + "\n");
        return;
    }


    const installedModuleIDs: string[] = (await process.requestExternal("nexus.Main", "get-module-IDs")).body as string[];

    if (!installedModuleIDs.includes(moduleID)) {
        console.error(
            `Could not find module with an ID of '${moduleID}'\n` +
            `Use the command 'nexus.Main.installed-modules' for a list of all installed modules.\n`
        );

        return;
    }

    const moduleInfoPath: string = path.join(DIRECTORIES.COMPILED_MODULES_PATH, moduleID, "module-info.json");
    if (!(await checkFileExists(moduleInfoPath))) {
        console.error(`Could not find path: ${moduleInfoPath}\n`);
        return;
    }

    const response: string = (await fs.promises.readFile(moduleInfoPath)).toString()
    if (response === '') {
        console.error("Error parsing module-info.json\n");
        return;
    }

    const json: { [key: string]: any } = JSON.parse(response);
    const out: string[] = [''];

    for (const key in json) {
        out.push(`${indent(2)}${key}: ${json[key]}`);
    }

    console.info(out.join("\n") + "\n");


}

function checkFileExists(file: string): Promise<boolean> {
    return fs.promises.access(file, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);
}