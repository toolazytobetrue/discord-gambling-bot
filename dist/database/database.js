"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("mysql"));
class Database {
    constructor(options) {
        this.connection = mysql.createConnection(options);
    }
    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) {
                    return reject(err);
                }
                return resolve(null);
            });
        });
    }
    getUsers() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM Users', function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
    getUser(uuid) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM Users WHERE Uuid = ?', [uuid], function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
    getAllPairs() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM Pairs p WHERE p.Used = false ORDER BY p.DateAdded ASC', function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
    getPairs(uuid) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT p.Id, p.UserId, p.ServerSeed, p.ServerHash, p.UserSeed, p.Result, p.DateAdded FROM Pairs p LEFT JOIN Users u ON u.Id = p.UserId WHERE u.Uuid = ? AND p.Used = false ORDER BY p.DateAdded ASC', [uuid], function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
    addUser(uuid) {
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO Users SET ?', { uuid: uuid }, function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
    addPair(userId, serverSeed, serverHash, userSeed, result) {
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO Pairs SET ?', {
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
    }
    updateUser(uuid, osrs, newBalance) {
        const type = osrs ? 'BalanceOsrs' : 'BalanceRs';
        return new Promise((resolve, reject) => {
            this.connection.query(`UPDATE Users SET ${type} = ? WHERE Uuid = ?`, [newBalance, uuid], function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
    voidPair(pairId) {
        return new Promise((resolve, reject) => {
            this.connection.query(`UPDATE Pairs SET Used = true WHERE Id = ?`, [pairId], function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
    addGame(pairId, amount, win, gameType, server) {
        return new Promise((resolve, reject) => {
            this.connection.query("INSERT INTO Games SET ?", {
                PairId: pairId,
                Amount: amount,
                Win: win,
                GameType: gameType,
                Server: server
            }, function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
    getUserStatistics(uuid, server) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT u.Id, SUM(g.Amount) as Sum, WEEK(g.DateAdded) as Week, g.Server FROM Games g JOIN Pairs p ON p.Id = g.PairId JOIN Users u ON u.Id = p.UserId WHERE u.uuid = ? AND g.server = ? GROUP BY WEEK(g.DateAdded)', [uuid, server], function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
    getUserWeeklyStatistics(uuid, server, weekNumber) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT u.Id, SUM(g.Amount) as Sum, WEEK(g.DateAdded) as Week FROM Games g JOIN Pairs p ON p.Id = g.PairId JOIN Users u ON u.Id = p.UserId WHERE u.uuid = ? AND g.server = ? AND WEEK(g.DateAdded) = ?', [uuid, server, weekNumber], function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
    getUsersWeeklyStatistics(server, weekNumber) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT u.Id, U.Uuid, SUM(g.Amount) as Sum, WEEK(g.DateAdded) as Week FROM Games g JOIN Pairs p ON p.Id = g.PairId JOIN Users u ON u.Id = p.UserId WHERE g.server = ? AND WEEK(g.DateAdded) = ? GROUP BY Id ORDER BY Sum DESC LIMIT 10', [server, weekNumber], function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
    getUsersStatistics(server) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT u.Id, U.Uuid, SUM(g.Amount) as Sum, WEEK(g.DateAdded) as Week FROM Games g JOIN Pairs p ON p.Id = g.PairId JOIN Users u ON u.Id = p.UserId AND g.server = ? ORDER BY Sum DESC LIMIT 10', [server], function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
    addTransaction(CashierUuid, UserId, Amount, Server, CashIn) {
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO Transactions SET ?', {
                CashierUuid,
                UserId,
                Amount,
                Server,
                CashIn
            }, function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
    getTransactions(Server, CashIn) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT Transactions.Id, CashierUuid, Users.Uuid as UserUuid, Amount, Server, CashIn, Transactions.DateAdded FROM Transactions JOIN Users ON Users.Id = Transactions.UserId  WHERE Server = ? AND CashIn = ? ORDER BY DateAdded DESC LIMIT 50', [Server, CashIn], function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
    getUserCashInOuts(CashierUuid, Server, CashIn) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT CashierUuid, Server, CashIn, SUM(Amount) as Amount FROM Transactions WHERE CashierUuid = ? AND Server = ? AND CashIn = ? GROUP BY CashIn, Server, CashierUuid', [CashierUuid, Server, CashIn], function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map