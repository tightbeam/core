const readline = require('readline-sync');
const config = require('./config');

const error = (message) => {
    console.error(`[ERROR] ${message}`);
    process.exit(-1);
}

const debug = (message) => {
    if (config.get('debug')) {
        console.log(`[DEBUG] ${message}`);
    }
}

const info = (message) => {
    console.log(`[INFO] ${message}`);
}

const puts = { error, info, debug }

const gets = (prompt, hide=false) => {
    return readline.question(prompt, {
        hideEchoBack: hide
    });
}

module.exports = { puts, gets }