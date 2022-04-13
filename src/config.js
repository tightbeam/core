let options = {
    "debug": false,
    "vaultFile": ".vault.ini",
    "loadFile": "Tightbeam.js",
    "version": require("../package.json").version
}

const set = (key, value) => {
    options[key] = value;
}

const get = (key) => {
    return options[key];
}

module.exports = { set, get }