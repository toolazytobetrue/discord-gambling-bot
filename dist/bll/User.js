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
const Utils_1 = require("../utils/Utils");
class User {
    constructor(dbInstance, server) {
        this.dbInstance = dbInstance;
        this.server = server;
    }
    createNewUser(user, displayMessage = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const _user = yield this.dbInstance.getUser(user.id);
            if (_user[0]) {
                return;
            }
            yield this.dbInstance.addUser(user.id);
            const channel = this.server.channels.find(ch => ch.id === process.env.DISCORD_GREETING_CHANNEL_ID);
            if (!channel) {
                return;
            }
            if (displayMessage) {
                channel.send(Utils_1.embeddedInstance(`Wallet System`, `Successfully created wallet for ${user}`));
            }
        });
    }
    getUser(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const _user = yield this.dbInstance.getUser(uuid);
            if (_user[0]) {
                return Promise.resolve(_user[0]);
            }
            yield this.dbInstance.addUser(uuid);
            const createdUser = yield this.dbInstance.getUser(uuid);
            return Promise.resolve(createdUser[0]);
        });
    }
    updateUser(uuid, osrs, newBalance) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbInstance.updateUser(uuid, osrs, newBalance);
        });
    }
    updateCashier(uuid, flag, minBalance, maxLimit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbInstance.updateCashier(uuid, flag, minBalance, maxLimit);
        });
    }
    getUserPairs(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUser(uuid);
            const currentPairs = yield this.dbInstance.getPairs(uuid);
            if (currentPairs.length < 50) {
                for (let i = 0; i < 250; i++) {
                    const serverSeed = Utils_1.generateRandomString(32);
                    const clientSeed = Utils_1.generateRandomString(8);
                    const serverHash = Utils_1.generateHash(serverSeed, clientSeed);
                    const result = Utils_1.roll(serverSeed, clientSeed);
                    yield this.dbInstance.addPair(user.Id, serverSeed, serverHash, clientSeed, `${result}`);
                }
            }
            const newPairs = yield this.dbInstance.getPairs(user.Uuid);
            return Promise.resolve(newPairs);
        });
    }
    getUsersStatistics(server) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.dbInstance.getUsersStatistics(server);
            return Promise.resolve(results);
        });
    }
    ;
    getUserStatistics(uuid, server) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.dbInstance.getUserStatistics(uuid, server);
            let total = 0;
            results.forEach((result) => {
                total += result.Sum;
            });
            return Promise.resolve(total);
        });
    }
    ;
    getUserWeeklyStatistics(uuid, server, weekNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.dbInstance.getUserWeeklyStatistics(uuid, server, weekNumber);
            let total = 0;
            results.forEach((result) => {
                total += result.Sum;
            });
            return Promise.resolve(total);
        });
    }
    ;
    getUsersWeeklyStatistics(server, weekNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.dbInstance.getUsersWeeklyStatistics(server, weekNumber);
            return Promise.resolve(results);
        });
    }
    ;
}
exports.User = User;
//# sourceMappingURL=User.js.map