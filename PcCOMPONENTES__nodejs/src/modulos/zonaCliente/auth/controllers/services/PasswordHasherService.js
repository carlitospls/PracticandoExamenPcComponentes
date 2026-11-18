const bcrypt = require('bcrypt');

class PasswordHasherService {
    constructor() {
        this.saltRounds = 10; // Número de rondas de sal para bcrypt
    }
    async hashPassword(password) {
        return await bcrypt.hash(password, this.saltRounds);
    }

    async verifyPassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}
module.exports = PasswordHasherService;