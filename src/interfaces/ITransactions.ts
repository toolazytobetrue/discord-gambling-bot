export interface ITransactions {
    addTransaction(CashierUuid: string, Uuid: string, Amount: string, Server: string, CashIn: boolean): Promise<any>;
    getTransactions(Server: string, CashIn: boolean): Promise<any>;
    getUserTransactions(CashierUuid: string, Server: string, CashIn: boolean): Promise<any>;
    deleteTxs(Uuid: string): Promise<any>;
}