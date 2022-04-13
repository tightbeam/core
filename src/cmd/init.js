const { Command } = require("commander");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const config = require("../config");
const { puts } = require("../console");

const writeTemplate = (template, dest) => {
    puts.info(`write ${dest}`);
    let text = ejs.render(
        fs.readFileSync(
            path.resolve(__dirname, "..", "tpl", template), "utf-8"
        ),
        { config }
    );
    let fd = fs.openSync(dest, "a+");
    fs.writeFileSync(fd, text);
}

const initProject = (_p) => {
    let projectPath = path.resolve(_p);

    puts.info(`init project at ${projectPath}`);

    if(!fs.existsSync(projectPath)) { puts.error(`directory ${projectPath} does not exist`); }
    if(!fs.statSync(projectPath).isDirectory()) { puts.error(`${projectPath} is not a directory`); }

    let vaultFilePath = path.resolve(projectPath, config.get("vaultFile"));
    if(fs.existsSync(vaultFilePath)) { puts.error(`${vaultFilePath} already exists`); }

    let loadFilePath = path.resolve(projectPath, config.get("loadFile"));
    if(fs.existsSync(loadFilePath)) { puts.error(`${loadFilePath} already exists`); }

    let packageFilePath = path.resolve(projectPath, "package.json");
    if(fs.existsSync(packageFilePath)) { puts.error(`${packageFilePath} already exists`); }

    writeTemplate(".vault.ini.ejs", vaultFilePath);
    writeTemplate("Tightbeam.js.ejs", loadFilePath);
    writeTemplate("package.json.ejs", packageFilePath);
    writeTemplate(".gitignore.ejs", path.resolve(projectPath, ".gitignore"));
}

module.exports = (program) => {
    program
    .addCommand(
        new Command("init")
            .argument("[path]", "project root", ".")
            .action(initProject)
    );
}