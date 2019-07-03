"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var Utils_1 = require("../utils/Utils");
var User = /** @class */ (function () {
    function User(dbInstance, server) {
        this.dbInstance = dbInstance;
        this.server = server;
    }
    User.prototype.createNewUser = function (user, displayMessage) {
        if (displayMessage === void 0) { displayMessage = true; }
        return __awaiter(this, void 0, void 0, function () {
            var _user, channel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbInstance.getUser(user.id)];
                    case 1:
                        _user = _a.sent();
                        if (_user[0]) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.dbInstance.addUser(user.id)];
                    case 2:
                        _a.sent();
                        channel = this.server.channels.find(function (ch) { return ch.id === process.env.DISCORD_GREETING_CHANNEL_ID; });
                        if (!channel) {
                            return [2 /*return*/];
                        }
                        if (displayMessage) {
                            channel.send(Utils_1.embeddedInstance("Wallet System", "Successfully created wallet for " + user));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.getUser = function (uuid) {
        return __awaiter(this, void 0, void 0, function () {
            var _user, createdUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbInstance.getUser(uuid)];
                    case 1:
                        _user = _a.sent();
                        if (_user[0]) {
                            return [2 /*return*/, Promise.resolve(_user[0])];
                        }
                        return [4 /*yield*/, this.dbInstance.addUser(uuid)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.dbInstance.getUser(uuid)];
                    case 3:
                        createdUser = _a.sent();
                        return [2 /*return*/, Promise.resolve(createdUser[0])];
                }
            });
        });
    };
    User.prototype.updateUser = function (uuid, osrs, newBalance) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbInstance.updateUser(uuid, osrs, newBalance)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    User.prototype.getUserPairs = function (uuid) {
        return __awaiter(this, void 0, void 0, function () {
            var user, currentPairs, i, serverSeed, clientSeed, serverHash, result, newPairs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUser(uuid)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.dbInstance.getPairs(uuid)];
                    case 2:
                        currentPairs = _a.sent();
                        if (!(currentPairs.length < 50)) return [3 /*break*/, 6];
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < 250)) return [3 /*break*/, 6];
                        serverSeed = Utils_1.generateRandomString(32);
                        clientSeed = Utils_1.generateRandomString(8);
                        serverHash = Utils_1.generateHash(serverSeed, clientSeed);
                        result = Utils_1.roll(serverSeed, clientSeed);
                        return [4 /*yield*/, this.dbInstance.addPair(user.Id, serverSeed, serverHash, clientSeed, "" + result)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [4 /*yield*/, this.dbInstance.getPairs(user.Uuid)];
                    case 7:
                        newPairs = _a.sent();
                        return [2 /*return*/, Promise.resolve(newPairs)];
                }
            });
        });
    };
    User.prototype.getUsersStatistics = function (server) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbInstance.getUsersStatistics(server)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, Promise.resolve(results)];
                }
            });
        });
    };
    ;
    User.prototype.getUserStatistics = function (uuid, server) {
        return __awaiter(this, void 0, void 0, function () {
            var results, total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbInstance.getUserStatistics(uuid, server)];
                    case 1:
                        results = _a.sent();
                        total = 0;
                        results.forEach(function (result) {
                            total += result.Sum;
                        });
                        return [2 /*return*/, Promise.resolve(total)];
                }
            });
        });
    };
    ;
    User.prototype.getUserWeeklyStatistics = function (uuid, server, weekNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var results, total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbInstance.getUserWeeklyStatistics(uuid, server, weekNumber)];
                    case 1:
                        results = _a.sent();
                        total = 0;
                        results.forEach(function (result) {
                            total += result.Sum;
                        });
                        return [2 /*return*/, Promise.resolve(total)];
                }
            });
        });
    };
    ;
    User.prototype.getUsersWeeklyStatistics = function (server, weekNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbInstance.getUsersWeeklyStatistics(server, weekNumber)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, Promise.resolve(results)];
                }
            });
        });
    };
    ;
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map