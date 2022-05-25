"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = require("./routes");
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.json());
(0, routes_1.routes)(app);
app.listen(port, function () {
    console.log('server working :)');
});
exports.default = app;
