



/**
 * excluded: Any files/directories to not include in the final module.
 * included: Any files/directories to include in the final module.
 */
module.exports = {
    excluded: ["electron.ts"],
    included: [],
    build: {
        id: "aarontburn.Debug_Console_Extras",
        process: "./process/main"
    }
}