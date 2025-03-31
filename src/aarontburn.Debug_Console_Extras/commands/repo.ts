import { StorageHandler } from "@nexus/nexus-module-builder";
import { Command } from "../Commands";
import { DebugConsoleExtras } from "../DebugConsoleExtrasProcess";
import * as path from "path";
import * as fs from "fs";
import { shell } from "electron";


export const repoCommand = (process: DebugConsoleExtras): Command => {
    return {
        prefix: "repo",
        executeCommand: (args: string[]) => executeCommand(process, args),
        documentation: {
            shortDescription: "Displays the repository/website, if possible, of a module.",
            longDescription: `
Usage: repo <moduleID> [--open]

        - Displays the link from the 'link' field in 'module-info.json', if applicable.
            - Because this field is set by the module developer, this is not guaranteed to be safe.

        - For security purposes, this doesn't directly open the links without the '--open' flag.

        Example:
        >> repo aarontburn.Debug_Console_Extras
        >> repo aarontburn.Debug_Console_Extras --open`
        }
    }
}


const redirectToMainPage: string[] = [
    'built_ins.Home',
    'built_ins.Settings',
    'built_ins.Main'
]

export async function executeCommand(process: DebugConsoleExtras, args: string[]): Promise<void> {
    const moduleID: string | undefined = args[1];
    if (moduleID === undefined) {
        console.error(`Missing module ID. Usage: 'repo <moduleID>'\n`);
        return;
    }
    if (redirectToMainPage.includes(moduleID)) {
        const link: string = "https://github.com/aarontburn/nexus-core"
        if (args.includes("--open")) {
            console.info(`Opening '${link}' in your browser.\n`);
            shell.openExternal(link);
        } else {
            console.info(link + "\n");
        }
        return;
    }


    const installedModuleIDs: string[] = (await process.requestExternal("built_ins.Main", "get-module-IDs")) as string[];

    if (!installedModuleIDs.includes(moduleID)) {
        console.error(
            `Could not find module with an ID of '${moduleID}'\n` +
            `Use the command 'built_ins.Main.installed-modules' for a list of all installed modules.\n`
        );

        return;
    }

    const moduleInfoPath: string = path.join(StorageHandler.COMPILED_MODULES_PATH, moduleID, "module-info.json");
    if (!(await checkFileExists(moduleInfoPath))) {
        console.error(`Could not find path: ${moduleInfoPath}\n`);
        return;
    }

    const response: string = (await fs.promises.readFile(moduleInfoPath)).toString()
    if (response === '') {
        console.error("Error parsing module-info.json\n");
        return;
    }

    const link: string | undefined = JSON.parse(response)["link"];
    if (link === undefined) {
        console.warn(`No repository link found in ${moduleID}/module-info.json\n`);
        return;
    }

    if (args.includes("--open")) {
        console.info(`Opening '${link}' in your browser.\n`);
        shell.openExternal(link);
    } else {
        console.info(link + "\n");
    }


}

function checkFileExists(file: string): Promise<boolean> {
    return fs.promises.access(file, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);
}