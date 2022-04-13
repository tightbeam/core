const fs = require("fs");
const path = require("path");
const ini = require("ini");
const config = require("./config");
const { Vault } = require("ansible-vault");
const { puts, gets } = require("./console");

const read = () => {
    let file = path.resolve(config.get("vaultFile"));
    let contents = fs.readFileSync(file, 'utf-8');
    let isEncrypted = contents.startsWith("$ANSIBLE_VAULT;1.1;AES256");
    return { isEncrypted, contents, file }
};

const vars = () => {
    let { isEncrypted, contents, file } = read()

    if (isEncrypted) {
        contents = decrypt(contents, file);
    }

    return JSON.parse(JSON.stringify(ini.parse(contents)));
};

const decrypt = (ciphertext, file) => {
    const v = new Vault({ password: gets(`Password for ${file}: `, true) });
    return v.decryptSync(ciphertext);
}

const encrypt = (cleartext, file) => {
    const v = new Vault({password: gets(`Password for ${file}: `, true) });
    return v.encryptSync(cleartext);
}

const lockInPlace = () => {
    let { isEncrypted, contents, file } = read();
    if (isEncrypted) { puts.error(`${file} is already encrypted`) }

    puts.info(`encrypt ${file}`);

    let text = encrypt(contents, file);

    puts.info(`write ${file}`);

    const fd = fs.openSync(file,"w");
    fs.writeFileSync(fd, text);

}

const unlockInPlace = () => {
    let { isEncrypted, contents, file } = read();
    if (!isEncrypted) { puts.error(`${file} is not encrypted`) }

    puts.info(`decrypt ${file}`);

    let text = decrypt(contents, file);

    puts.info(`write ${file}`);
    const fd = fs.openSync(file,"w");
    fs.writeFileSync(fd, text);

}
module.exports = { vars, lockInPlace, unlockInPlace }