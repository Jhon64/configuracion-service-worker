"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const constantes_1 = require("./../constantes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.JWT = {
    generate(user) {
        const secret = constantes_1.ENVIRONMENT.jwt.secretKey || 'miSecret';
        const options = {
        // expiresIn: ENVIRONMENT.jwt.expiresIn,
        // algorithm: ENVIRONMENT.jwt.algorithm,
        };
        try {
            return jsonwebtoken_1.default.sign(user, secret, options);
        }
        catch (error) {
            console.log('error generando token', error);
            throw new Error(error + '');
        }
    },
    decode(token) {
        const secret = constantes_1.ENVIRONMENT.jwt.secretKey || 'miSecret';
        const options = {
            expiresIn: constantes_1.ENVIRONMENT.jwt.expiresIn,
            algorithm: constantes_1.ENVIRONMENT.jwt.algorithm,
        };
        let verifyToken;
        try {
            jsonwebtoken_1.default.verify(token, secret, (err, decode) => {
                if (err) {
                    throw err;
                }
                verifyToken = decode;
            });
        }
        catch (error) {
            throw error;
        }
        return verifyToken;
    },
    verifyToken(req, res, next) {
        // middleware to validate token (rutas protegidas)
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        console.log('token recibido ::', token);
        if (!token)
            return res.status(401).json({ error: 'Acceso denegado' });
        try {
            const verified = exports.JWT.decode(token);
            req.user = verified;
            next(); // continuamos
        }
        catch (error) {
            console.log('ERROR AUTH JWT', error);
            res.status(401).json({ error: 'token no es válido' });
        }
    },
    defaultVerify(req, res, next) { return next(); }
};
