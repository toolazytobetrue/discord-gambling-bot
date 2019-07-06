import * as mysql from 'mysql';
export interface IDatabase {
    connect(): Promise<mysql.MysqlError | null>;
    getUser(uuid: string): Promise<mysql.MysqlError | any>;
    getUsers(): Promise<mysql.MysqlError | any>;
    addUser(uuid: string): Promise<mysql.MysqlError | any>;
    addPair(userId: number, serverSeed: string, serverHash: string, userSeed: string, result: string): Promise<mysql.MysqlError | any>;
    getAllPairs(): Promise<mysql.MysqlError | any>;
    getPairs(uuid: string): Promise<mysql.MysqlError | any>;
    updateUser(uuid: string, osrs: boolean, newBalance: number): Promise<mysql.MysqlError | any>;
    updateCashier(uuid: string, flag: boolean, minBalance: number, maxLimit: number): Promise<mysql.MysqlError | any>;
    voidPair(pairId: number): Promise<mysql.MysqlError | any>;
    addGame(pairId: number, amount: string, win: boolean, gameType: string, server: string): Promise<any>;
    getUsersStatistics(server: string): Promise<any>;
    getUserStatistics(uuid: string, server: string): Promise<any>;
    getUserWeeklyStatistics(uuid: string, server: string, weekNumber: number): Promise<any>;
    getUsersWeeklyStatistics(server: string, weekNumber: number): Promise<any>;
    addTransaction(CashierUuid: string, UserId: number, Amount: string, Server: string, CashIn: boolean): Promise<any>;
    getTransactions(Server: string, CashIn: boolean): Promise<any>;
    getUserTransactions(CashierUuid: string, Server: string, CashIn: boolean): Promise<any>;
    deleteTxs(Uuid: string): Promise<any>;
}