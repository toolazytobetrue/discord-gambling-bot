import * as mysql from 'mysql';
import { IDatabase } from '../interfaces/IDatabase';
export class Database implements IDatabase {

    connection: mysql.Connection;
    public constructor(options: string | mysql.ConnectionConfig) {
        this.connection = mysql.createConnection(options);
    }

    connect(): Promise<mysql.MysqlError | null> {
        return new Promise((resolve, reject) => {
            this.connection.connect((err: any) => {
                if (err) {
                    return reject(err);
                }
                return resolve(null);
            })
        });
    }

    getUsers(): Promise<mysql.MysqlError | any> {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM Users', function (error: any, results: any, fields: any) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    getUser(uuid: string): Promise<mysql.MysqlError | any> {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM Users WHERE Uuid = ?', [uuid], function (error: any, results: any, fields: any) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    getAllPairs(): Promise<mysql.MysqlError | any> {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM Pairs p WHERE p.Used = false ORDER BY p.DateAdded ASC', function (error: any, results: any, fields: any) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    getPairs(uuid: string): Promise<mysql.MysqlError | any> {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT p.Id, p.UserId, p.ServerSeed, p.ServerHash, p.UserSeed, p.Result, p.DateAdded FROM Pairs p LEFT JOIN Users u ON u.Id = p.UserId WHERE u.Uuid = ? AND p.Used = false ORDER BY p.DateAdded ASC', [uuid], function (error: any, results: any, fields: any) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    addUser(uuid: string): Promise<mysql.MysqlError | any> {
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO Users SET ?', { uuid: uuid }, function (error: any, results: any, fields: any) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    addPair(userId: number, serverSeed: string, serverHash: string, userSeed: string, result: string): Promise<mysql.MysqlError | any> {
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO Pairs SET ?', {
                UserId: userId,
                ServerSeed: serverSeed,
                ServerHash: serverHash,
                UserSeed: userSeed,
                Result: result
            }, function (error: any, results: any, fields: any) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    updateUser(uuid: string, osrs: boolean, newBalance: number): Promise<mysql.MysqlError | any> {
        const type = osrs ? 'BalanceOsrs' : 'BalanceRs';
        return new Promise((resolve, reject) => {
            this.connection.query(`UPDATE Users SET ${type} = ? WHERE Uuid = ?`, [newBalance, uuid], function (error: any, results: any, fields: any) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    voidPair(pairId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(`UPDATE Pairs SET Used = true WHERE Id = ?`, [pairId], function (error: any, results: any, fields: any) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    addGame(pairId: number, amount: string, win: boolean, gameType: string, server: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query("INSERT INTO Games SET ?", {
                PairId: pairId,
                Amount: amount,
                Win: win,
                GameType: gameType,
                Server: server
            }, function (error: any, results: any, fields: any) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    getUserStatistics(uuid: string, server: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT u.Id, SUM(g.Amount) as Sum, WEEK(g.DateAdded) as Week, g.Server FROM Games g JOIN Pairs p ON p.Id = g.PairId JOIN Users u ON u.Id = p.UserId WHERE u.uuid = ? AND g.server = ? GROUP BY WEEK(g.DateAdded)', [uuid, server], function (error: any, results: any, fields: any) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    getUserWeeklyStatistics(uuid: string, server: string, weekNumber: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT u.Id, SUM(g.Amount) as Sum, WEEK(g.DateAdded) as Week FROM Games g JOIN Pairs p ON p.Id = g.PairId JOIN Users u ON u.Id = p.UserId WHERE u.uuid = ? AND g.server = ? AND WEEK(g.DateAdded) = ?', [uuid, server, weekNumber], function (error: any, results: any, fields: any) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    getUsersWeeklyStatistics(server: string, weekNumber: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT u.Id, U.Uuid, SUM(g.Amount) as Sum, WEEK(g.DateAdded) as Week FROM Games g JOIN Pairs p ON p.Id = g.PairId JOIN Users u ON u.Id = p.UserId WHERE g.server = ? AND WEEK(g.DateAdded) = ? GROUP BY Id ORDER BY Sum DESC LIMIT 10', [server, weekNumber], function (error: any, results: any, fields: any) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    getUsersStatistics(server: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT u.Id, U.Uuid, SUM(g.Amount) as Sum, WEEK(g.DateAdded) as Week FROM Games g JOIN Pairs p ON p.Id = g.PairId JOIN Users u ON u.Id = p.UserId AND g.server = ? ORDER BY Sum DESC LIMIT 10', [server], function (error: any, results: any, fields: any) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    addTransaction(CashierUuid: string, UserId: number, Amount: string, Server: string, CashIn: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO Transactions SET ?', {
                CashierUuid,
                UserId,
                Amount,
                Server,
                CashIn
            }, function (error: any, results: any, fields: any) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    getTransactions(Server: string, CashIn: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT Transactions.Id, CashierUuid, Users.Uuid as UserUuid, Amount, Server, CashIn, Transactions.DateAdded FROM Transactions JOIN Users ON Users.Id = Transactions.UserId  WHERE Server = ? AND CashIn = ? ORDER BY DateAdded DESC LIMIT 50', [Server, CashIn], function (error: any, results: any, fields: any) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    getUserCashInOuts(CashierUuid: string, Server: string, CashIn: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT CashierUuid, Server, CashIn, SUM(Amount) as Amount FROM Transactions WHERE CashierUuid = ? AND Server = ? AND CashIn = ? GROUP BY CashIn, Server, CashierUuid', [CashierUuid, Server, CashIn], function (error: any, results: any, fields: any) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
}