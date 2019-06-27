import * as mysql from 'mysql';
import { IDatabase } from '../interfaces/IDatabase';
export class Database implements IDatabase {
    connection: mysql.Connection;
    public constructor(options: string | mysql.ConnectionConfig) {
        this.connection = mysql.createConnection(options);
    }

    connect(): Promise<mysql.MysqlError | null> {
        return new Promise((resolve, reject) => {
            this.connection.connect(err => {
                if (err) {
                    return reject(err);
                }
                return resolve(null);
            })
        });
    }

    getUsers(): Promise<mysql.MysqlError | any> {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM Users', function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    getUser(uuid: string): Promise<mysql.MysqlError | any> {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM Users WHERE Uuid = ?', [uuid], function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    getAllPairs(): Promise<mysql.MysqlError | any> {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM Pairs p WHERE p.Used = false ORDER BY p.DateAdded ASC', function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    getPairs(uuid: string): Promise<mysql.MysqlError | any> {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT p.Id, p.UserId, p.ServerSeed, p.ServerHash, p.UserSeed, p.Result, p.DateAdded FROM Pairs p LEFT JOIN Users u ON u.Id = p.UserId WHERE u.Uuid = ? AND p.Used = false ORDER BY p.DateAdded ASC', [uuid], function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    addUser(uuid: string): Promise<mysql.MysqlError | any> {
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO Users SET ?', { uuid: uuid }, function (error, results, fields) {
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
            }, function (error, results, fields) {
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
            this.connection.query(`UPDATE Users SET ${type} = ? WHERE Uuid = ?`, [newBalance, uuid], function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    voidPair(pairId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query(`UPDATE Pairs SET Used = true WHERE Id = ?`, [pairId], function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }

    addGame(pairId: number, amount: string, gameType: string, server: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO Games SET ?', {
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
    }
}