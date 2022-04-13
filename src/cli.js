#!/usr/bin/env node
const { Command, Option } = require("commander");
const config = require("./config");

const program = new Command();

program
    .enablePositionalOptions()
    .name("tightbeam")
    .version(config.get('version'))
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

require("./cmd/init")(program);

program.parse()