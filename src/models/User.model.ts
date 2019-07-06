export interface User {
    Id: number;
    Uuid: string;
    BalanceRs: number;
    BalanceOsrs: number;
    IsCashier: boolean;
    MaxCashIn: number;
    MinBalance: number;
    DateJoined: Date;
    LastUpdate: Date;
}