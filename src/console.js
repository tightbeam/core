const readline = require('readline-sync');

const error = (message) => {
    console.error(`ERROR: ${message}`);
    process.exit(-1);
}

const info = (message) => {
    console.log(`INFO: ${message}`);
}

const puts = { error, info }

const gets = (prompt, hide=false) => {
    return readline.question(prompt, {
        hideEchoBack: hide
    });
}

module.exports = { puts, gets }