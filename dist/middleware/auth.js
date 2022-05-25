"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth = function (req, res, next) {
    var _a;
    var authHeader = req.headers.authorization;
    var token = (_a = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]) !== null && _a !== void 0 ? _a : ' ';
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_PASS);
        next();
    }
    catch (err) {
        res.status(401);
        res.json("invalid token ".concat(err));
        return false;
    }
};
exports.auth = auth;
