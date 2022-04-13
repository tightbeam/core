const { Command, Option } = require("commander");
const { gets, puts } = require("./console");
const vault = require("./vault");

module.exports = {
    Command,
    Option,
    gets,
    puts,
    vault
}