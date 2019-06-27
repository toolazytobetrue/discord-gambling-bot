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
    voidPair(pairId: number): Promise<mysql.MysqlError | any>;
    addGame(pairId: number, amount: string, gameType: string, server: string): Promise<any>;
}