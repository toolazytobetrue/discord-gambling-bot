import { IDatabase } from "../interfaces/IDatabase";
import { IUser } from "../interfaces/IUSer";
import { ITransactions } from "../interfaces/ITransactions";
export class Transactions implements ITransactions {
    dbInstance: IDatabase;
    userInstance: IUser;
    constructor(dbInstance: IDatabase, userInstance: IUser) {
        this.dbInstance = dbInstance;
        this.userInstance = userInstance;
    }

    async addTransaction(CashierUuid: string, Uuid: string, Amount: string, Server: string, CashIn: boolean): Promise<any> {
        const user = await this.userInstance.getUser(Uuid);
        const tx = await this.dbInstance.addTransaction(CashierUuid, user.Id, Amount, Server, CashIn);
        return Promise.resolve(tx);
    }

    async getTransactions(Server: string, CashIn: boolean): Promise<any> {
        const txs = await this.dbInstance.getTransactions(Server, CashIn);
        return Promise.resolve(txs);
    }

    async getUserTransactions(CashierUuid: string, Server: string, CashIn: boolean) {
        const results = await this.dbInstance.getUserTransactions(CashierUuid, Server, CashIn);
        if (results.length === 1) {
            return Promise.resolve(results[0].Amount);
        } else {
            return Promise.resolve(0);
        }
    }

    async deleteTxs(Uuid: string): Promise<any> {
        const deleted = await this.dbInstance.deleteTxs(Uuid);
        return Promise.resolve(deleted);
    }
}
