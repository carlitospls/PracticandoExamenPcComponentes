const jwt = require('jsonwebtoken');

class JwtTokenService {
    constructor({ jwtSecret, jwtExpiresIn }) {
        this.jwtSecret = jwtSecret;
        this.jwtExpiration = jwtExpiresIn;
        this.issuer = 'GeoApiNodejsMicroservice'; 
    }
    generateToken(payload) {
        return jwt.sign(payload, this.jwtSecret, { issuer: this.issuer, expiresIn: this.jwtExpiration });
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, this.jwtSecret, { issuer: this.issuer });
        } catch (err) {
            console.error('Error al verificar el token JWT:', err.message);
            return null;
        }
    }
}

module.exports = JwtTokenService;