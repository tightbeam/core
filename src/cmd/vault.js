const { Command } = require("commander");
const vault = require('../vault');

module.exports = (program) => {

    const vaultCmd = new Command("vault").description("manage encrypted config files");

    vaultCmd.addCommand(
        new Command("lock")
            .action(vault.lockInPlace)
            .description("encrypt vault file")
    );

    vaultCmd.addCommand(
        new Command("unlock")
            .action(vault.unlockInPlace)
            .description("decrypt vault file")
    );

    vaultCmd.addCommand(
        new Command("show")
            .action(() => { console.dir(vault.vars())})
            .description("show vault contents")
    );

    program.addCommand(vaultCmd);
}