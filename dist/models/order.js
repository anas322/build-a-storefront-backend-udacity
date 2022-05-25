"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
var database_1 = __importDefault(require("../database"));
var statusValue;
(function (statusValue) {
    statusValue[statusValue["active"] = 0] = "active";
    statusValue[statusValue["complete"] = 1] = "complete";
})(statusValue || (statusValue = {}));
var OrderModel = /** @class */ (function () {
    function OrderModel() {
    }
    //get all orders by user_id
    OrderModel.prototype.index = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT user_id, status, product_id, quantity FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE orders.user_id = $1';
                        return [4 /*yield*/, conn.query(sql, [user_id])
                            //check if there is any result
                        ];
                    case 2:
                        result = _a.sent();
                        //check if there is any result
                        if (result.rowCount) {
                            return [2 /*return*/, result.rows[0]];
                        }
                        return [2 /*return*/, null]; //no rows found
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("SQL Error: ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //show Current Order by user_id
    OrderModel.prototype.getCurrentOrder = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT user_id, status, product_id, quantity FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE orders.user_id = $1 ORDER BY order_id DESC LIMIT 1';
                        return [4 /*yield*/, conn.query(sql, [user_id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (result.rowCount) {
                            return [2 /*return*/, result.rows];
                        }
                        return [2 /*return*/, null]; //no rows found
                    case 3:
                        err_2 = _a.sent();
                        console.log(err_2);
                        throw new Error("SQL Error: ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //show completed Orders by user_id
    OrderModel.prototype.getCompletedOrders = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT user_id, status, product_id, quantity FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE orders.user_id = $1 AND orders.status = $2';
                        return [4 /*yield*/, conn.query(sql, [user_id, 'complete'])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        if (result.rowCount) {
                            return [2 /*return*/, result.rows];
                        }
                        return [2 /*return*/, null]; //no rows found
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("SQL Error: ".concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // create new order
    OrderModel.prototype.create = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, status, products, conn, ordersSql, res, sql, rows, order, orderProducts, orderProductsSql, _i, products_1, prd, orderProductsResult, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        user_id = product.user_id, status = product.status, products = product.products;
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        ordersSql = "SELECT * FROM users WHERE id = $1";
                        return [4 /*yield*/, conn.query(ordersSql, [user_id])];
                    case 2:
                        res = _a.sent();
                        if (!res.rowCount) return [3 /*break*/, 8];
                        sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
                        return [4 /*yield*/, conn.query(sql, [user_id, status])];
                    case 3:
                        rows = (_a.sent()).rows;
                        order = rows[0];
                        orderProducts = [];
                        orderProductsSql = 'INSERT INTO order_products(order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING product_id, quantity ';
                        _i = 0, products_1 = products;
                        _a.label = 4;
                    case 4:
                        if (!(_i < products_1.length)) return [3 /*break*/, 7];
                        prd = products_1[_i];
                        return [4 /*yield*/, conn.query(orderProductsSql, [
                                order.id,
                                prd.product_id,
                                prd.quantity,
                            ])];
                    case 5:
                        orderProductsResult = _a.sent();
                        orderProducts.push(orderProductsResult.rows[0]);
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        conn.release();
                        return [2 /*return*/, __assign(__assign({}, order), { products: orderProducts })];
                    case 8: return [2 /*return*/, null];
                    case 9:
                        err_4 = _a.sent();
                        throw new Error("SQL Error: ".concat(err_4));
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.delete = function (order_id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, SQL, orderResult, sql, Sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        SQL = 'SELECT FROM orders WHERE id = $1';
                        return [4 /*yield*/, conn.query(SQL, [order_id])];
                    case 2:
                        orderResult = _a.sent();
                        if (!orderResult.rowCount) return [3 /*break*/, 5];
                        sql = 'DELETE FROM order_products WHERE order_id = $1';
                        return [4 /*yield*/, conn.query(sql, [order_id])];
                    case 3:
                        _a.sent();
                        Sql = 'DELETE FROM orders WHERE id = $1';
                        return [4 /*yield*/, conn.query(Sql, [order_id])];
                    case 4:
                        result = _a.sent();
                        return [2 /*return*/, result.rowCount];
                    case 5: return [2 /*return*/, null];
                    case 6:
                        err_5 = _a.sent();
                        throw new Error("SQL Error: ".concat(err_5));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return OrderModel;
}());
exports.OrderModel = OrderModel;
