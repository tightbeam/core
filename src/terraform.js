const { puts } = require("./console");
const path = require('path');
const fs = require('fs');

class Vars {
    constructor(dirName, fileName = '.auto.tfvars') {
        this.fileName = path.resolve(dirName, fileName);
        this.vars = {}
    }

    set = (key, value) => {
        puts.debug(`${this.fileName} set ${key} => ${value}`);
        this.vars[key] = value;
    }

    writeSync = () => {
        puts.info(`write ${this.fileName}`);
        const fd = fs.openSync(this.fileName,"w");
        Object.keys(this.vars).forEach((k) => {
            fs.writeFileSync(fd, `${k} = "${this.vars[k]}"\n`);
        });
    }
}

module.exports = { Vars }
