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
class Games {
    constructor(dbInstance) {
        this.dbInstance = dbInstance;
    }
    // async addGame(pairId: number, amount: string, gameType: string, server: string): Promise<any> {
    // }
    addGame(pairId, amount, win, gameType, server) {
        return __awaiter(this, void 0, void 0, function* () {
            const addedGame = yield this.dbInstance.addGame(pairId, amount, win, gameType, server);
            return Promise.resolve(addedGame);
        });
    }
    voidPair(pairId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.dbInstance.voidPair(pairId);
            return Promise.resolve(result);
        });
    }
}
exports.Games = Games;
//# sourceMappingURL=Games.js.map