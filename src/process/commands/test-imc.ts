import { Command } from "../Commands";
import DebugConsoleExtras from "../main";


export const testIMCCommand = (process: DebugConsoleExtras): Command => {
    return {
        prefix: "test-imc",
        executeCommand: (args: string[]) => executeCommand(process, args),
        documentation: {
            shortDescription: "",
            longDescription: ``
        }
    }
}


async function executeCommand(process: DebugConsoleExtras, args: string[]): Promise<void> {
    const target: string = args[1];
    const eventName: string = args[2];
    const parameters: string[] = args.slice(3);

    const formattedParameters: any[] = [];
    for (let i = 0; i < parameters.length; i++) {
        formattedParameters[i] = parameters[i];
        if (parameters[i].match(/^cast<([^>]+)>\((.*)\)$/) !== null) {
            formattedParameters[i] = formatParameter(parameters[i], i);
        }

    }
    console.info(`${target}.${eventName}(${formattedParameters.map(p => {
        if (typeof p === 'object') {
            return JSON.stringify(p)
        }
        return p;
    }).join(', ')})`);
    console.info(await process.requestExternal(target, eventName, ...formattedParameters));
}


function formatParameter(parameter: string, i: number): any {
    const match = parameter.match(/^cast<([^>]+)>\((.*)\)$/);

    if (!match) {
        console.error(`Could not cast argument at position ${i}`);
        return parameter;
    }

    const [, type, value] = match;
    try {
        switch (type) {
            case "string": return value;
            case "number":
                const num = parseFloat(value);
                if (Number.isNaN(num)) throw new Error("Invalid number");
                return num;

            case "boolean":
                if (value === "true") return true;
                if (value === "false") return false;
                throw new Error("Invalid boolean");

            case "undefined": return undefined;
            case "null": return null;
            case "object": return JSON.parse(value.replace("'", '"'));
            case "function": return (args: any): any => { }
            default:
                console.error(`Unsupported cast type at position ${i}: ${type}`);
                return parameter;
        }
    } catch (e) {
        console.error(`Error casting parameter at position ${i}:`, e.message || e);
        return parameter;
    }
}