#!/usr/bin/env node
const { Command, Option } = require("commander");
const config = require("./config");
const { puts } = require("./console");
const path = require("path");

const program = new Command();

program
    .enablePositionalOptions()
    .name("tightbeam")
    .version(config.get('version'))
    .addOption(
        new Option("-d, --debug", "more screen noise")
            .argParser((opt) => { config.set("debug", true); }
            ))
    .addOption(
        new Option("-t, --vault <file>", "vault file")
            .default(config.get("vaultFile"))
            .argParser((opt) => { config.set("vaultFile", opt); }
    ))
    .addOption(
        new Option("-l, --load <file>", "file to load")
            .default(config.get("loadFile"))
            .argParser((opt) => { config.set("loadFile", opt); }
    ));

program.parse(process.argv.filter((v) => { return !['-h','--help'].includes(v); }));

require("./cmd/init")(program);
require("./cmd/vault")(program);

let loadFilePath = path.resolve(config.get('loadFile'));
puts.debug(`Lading ${loadFilePath}`);

require(loadFilePath)(program);

program.parse()