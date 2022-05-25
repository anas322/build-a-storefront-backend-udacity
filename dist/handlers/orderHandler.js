"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../middleware/auth");
var order_1 = require("../models/order");
var routes = (0, express_1.Router)();
var order = new order_1.OrderModel(); //order instance
//get all orders by order_id
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, order.index(id)];
            case 1:
                result = _a.sent();
                if (result) {
                    res.json(result);
                    return [2 /*return*/];
                }
                res.send('No result found to this user');
                return [2 /*return*/];
        }
    });
}); };
//show Current Order by user_id
var getCurrentOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, order.getCurrentOrder(id)];
            case 1:
                result = _a.sent();
                if (result) {
                    res.json(result);
                    return [2 /*return*/];
                }
                res.send('No result found to this user');
                return [2 /*return*/];
        }
    });
}); };
// show completed Orders by user_id
var getCompletedOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, order.getCompletedOrders(id)];
            case 1:
                result = _a.sent();
                if (result) {
                    res.json(result);
                    return [2 /*return*/];
                }
                res.send("This user doesn'nt have any completed orders");
                return [2 /*return*/];
        }
    });
}); };
// create new order
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, status, products, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = parseInt(req.body.user_id);
                status = req.body.status;
                products = req.body.products;
                if (!user_id || !status || !products.length) {
                    res.send('some parameters are missing!, please make sure all parameters are provided :)');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, order.create({ user_id: user_id, status: status, products: products })];
            case 1:
                result = _a.sent();
                if (result) {
                    res.json(result);
                    return [2 /*return*/];
                }
                res.send('User not found!');
                return [2 /*return*/];
        }
    });
}); };
// Delete order
var deleteOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order_id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order_id = parseInt(req.params.order_id);
                return [4 /*yield*/, order.delete(order_id)];
            case 1:
                result = _a.sent();
                if (result) {
                    res.json(result);
                    return [2 /*return*/];
                }
                res.send('order not found!');
                return [2 /*return*/];
        }
    });
}); };
routes.get('/orders/user/:id', auth_1.auth, index);
routes.get('/orders/user/:id/current', auth_1.auth, getCurrentOrder);
routes.get('/orders/user/:id/complete', auth_1.auth, getCompletedOrders);
routes.post('/orders/create', auth_1.auth, create);
routes.delete('/orders/:order_id/delete', auth_1.auth, deleteOrder);
exports.default = routes;
