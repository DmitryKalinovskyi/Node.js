const bcrypt = require('bcrypt');

async function hashPassword(password){
    return await bcrypt.hash(password, 8);
}

async function comparePasswords(rawPassword, hashedPassword){
    return await bcrypt.compare(rawPassword, hashedPassword)
}

module.exports = {hashPassword, comparePasswords};