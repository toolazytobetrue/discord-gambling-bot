import { MysqlError } from "mysql";
import { IDatabase } from "../interfaces/IDatabase";
import { IGames } from "../interfaces/IGames";
export class Games implements IGames {

    dbInstance: IDatabase;
    constructor(dbInstance: IDatabase) {
        this.dbInstance = dbInstance;
    }

    // async addGame(pairId: number, amount: string, gameType: string, server: string): Promise<any> {
    // }

    async addGame(pairId: number, amount: string, win: boolean, gameType: string, server: string): Promise<any> {
        const addedGame = await this.dbInstance.addGame(pairId, amount, win, gameType, server);
        return Promise.resolve(addedGame);
    }

    async voidPair(pairId: number): Promise<MysqlError | any> {
        const result = await this.dbInstance.voidPair(pairId);
        return Promise.resolve(result);
    }
}