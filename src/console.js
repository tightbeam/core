const error = (message) => {
    console.log(`ERROR: ${message}`);
    process.exit(-1);
}

const info = (message) => {
    console.log(`INFO: ${message}`);
}

const puts = { error, info }

module.exports = { puts }