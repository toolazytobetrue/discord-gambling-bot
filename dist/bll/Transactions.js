"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Transactions {
    constructor(dbInstance, userInstance) {
        this.dbInstance = dbInstance;
        this.userInstance = userInstance;
    }
    addTransaction(CashierUuid, Uuid, Amount, Server, CashIn) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userInstance.getUser(Uuid);
            const tx = yield this.dbInstance.addTransaction(CashierUuid, user.Id, Amount, Server, CashIn);
            return Promise.resolve(tx);
        });
    }
    getTransactions(Server, CashIn) {
        return __awaiter(this, void 0, void 0, function* () {
            const txs = yield this.dbInstance.getTransactions(Server, CashIn);
            return Promise.resolve(txs);
        });
    }
}
exports.Transactions = Transactions;
//# sourceMappingURL=Transactions.js.map