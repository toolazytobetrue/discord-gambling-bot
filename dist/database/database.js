"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = __importStar(require("mysql"));
var Database = /** @class */ (function () {
    function Database(options) {
        this.connection = mysql.createConnection(options);
    }
    Database.prototype.connect = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.connect(function (err) {
                if (err) {
                    return reject(err);
                }
                return resolve(null);
            });
        });
    };
    Database.prototype.getUsers = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query('SELECT * FROM Users', function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    };
    Database.prototype.getUser = function (uuid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query('SELECT * FROM Users WHERE Uuid = ?', [uuid], function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    };
    Database.prototype.getAllPairs = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query('SELECT * FROM Pairs p WHERE p.Used = false ORDER BY p.DateAdded ASC', function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    };
    Database.prototype.getPairs = function (uuid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query('SELECT p.Id, p.UserId, p.ServerSeed, p.ServerHash, p.UserSeed, p.Result, p.DateAdded FROM Pairs p LEFT JOIN Users u ON u.Id = p.UserId WHERE u.Uuid = ? AND p.Used = false ORDER BY p.DateAdded ASC', [uuid], function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    };
    Database.prototype.addUser = function (uuid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query('INSERT INTO Users SET ?', { uuid: uuid }, function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    };
    Database.prototype.addPair = function (userId, serverSeed, serverHash, userSeed, result) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query('INSERT INTO Pairs SET ?', {
                UserId: userId,
                ServerSeed: serverSeed,
                ServerHash: serverHash,
                UserSeed: userSeed,
                Result: result
            }, function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    };
    Database.prototype.updateUser = function (uuid, osrs, newBalance) {
        var _this = this;
        var type = osrs ? 'BalanceOsrs' : 'BalanceRs';
        return new Promise(function (resolve, reject) {
            _this.connection.query("UPDATE Users SET " + type + " = ? WHERE Uuid = ?", [newBalance, uuid], function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    };
    Database.prototype.voidPair = function (pairId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query("UPDATE Pairs SET Used = true WHERE Id = ?", [pairId], function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    };
    Database.prototype.addGame = function (pairId, amount, gameType, server) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query('INSERT INTO Games SET ?', {
                PairId: pairId,
                Amount: amount,
                GameType: gameType
            }, function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    };
    return Database;
}());
exports.Database = Database;
//# sourceMappingURL=database.js.map