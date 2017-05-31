#!/usr/bin/env node
import * as path from "path";
import * as Bluebird from "bluebird";
global.Promise = Bluebird; // only for CLI usage
const yargs = require("yargs");

import { resolve } from "./tsc-resolve";

const USAGE = `
USAGE:
    tsc-resolve
    tsc-resolve -p tsconfig.prod.json
    tsc-resolve -p ./conf/tsconfig.dev.json
    tsc-resolve -p ./conf/
    tsc-resolve -p ../
`;

let argv = yargs
    .usage(USAGE)
    .option("p", {
        alias: "project",
        default: "./tsconfig.json",
        global: false,
        description: "[FILE OR DIRECTORY]",
        type: "string",
        normalize: true,
    })
    .help()
    .epilogue("GitHub repository at https://github.com/mazhlekov/tsc-resolve")
    .argv


let tsConfigPath: string = path.resolve(process.cwd(), argv.p);

(async () => {
    try {
        await resolve(tsConfigPath);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
