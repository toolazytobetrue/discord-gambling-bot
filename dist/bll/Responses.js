"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../utils/Utils");
var Responses = /** @class */ (function () {
    function Responses(server, userInstance, gamesInstance) {
        this.commands = ['!help', '@help', '!commands', '@commands', '!balance', '@balance', '!wallet', '@wallet', '!deposit', '@deposit', '!cashin', '@cashin', '!cashout', '@cashout', '!withdraw', '@withdraw', '!54x2', '@54x2', '!pair', '@pair', '!verify', '@verify', '!random', '@random'];
        this.server = server;
        this.userInstance = userInstance;
        this.gamesInstance = gamesInstance;
    }
    Responses.prototype.reply = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var messages, command, mentionedMember, _a, id, username, tag, _b, commands, user, user, depositRole, targetUser, osrs, targetCurrentBalance, amountToAdd, newBalance, updateBalance, error_1, depositRole, targetUser, osrs, targetCurrentBalance, amountToDeduce, newBalance, updateBalance, error_2, pairs, pair, reply, pairs, pair, result, newPair, reply, reply, targetUser, osrs, targetCurrentBalance, amountToDeduce, pairs, pair, profit, newBalance, updateBalance, voidPair, reply, sentMessage, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        messages = msg.content.trim().toLowerCase().split(' ');
                        command = messages[0];
                        mentionedMember = msg.mentions.members.first();
                        if (this.commands.indexOf(command) === -1) {
                            return [2 /*return*/];
                        }
                        _a = msg.member.user, id = _a.id, username = _a.username, tag = _a.tag;
                        _b = command;
                        switch (_b) {
                            case '!commands': return [3 /*break*/, 1];
                            case '@commands': return [3 /*break*/, 1];
                            case '!help': return [3 /*break*/, 1];
                            case '@help': return [3 /*break*/, 1];
                            case '!balance': return [3 /*break*/, 2];
                            case '@balance': return [3 /*break*/, 2];
                            case '!wallet': return [3 /*break*/, 2];
                            case '@wallet': return [3 /*break*/, 2];
                            case '!deposit': return [3 /*break*/, 8];
                            case '@deposit': return [3 /*break*/, 8];
                            case '!cashin': return [3 /*break*/, 8];
                            case '@cashin': return [3 /*break*/, 8];
                            case '!cashout': return [3 /*break*/, 14];
                            case '@cashout': return [3 /*break*/, 14];
                            case '!withdraw': return [3 /*break*/, 14];
                            case '@withdraw': return [3 /*break*/, 14];
                            case '!pair': return [3 /*break*/, 20];
                            case '@pair': return [3 /*break*/, 20];
                            case '!random': return [3 /*break*/, 23];
                            case '@random': return [3 /*break*/, 23];
                            case '!verify': return [3 /*break*/, 27];
                            case '@verify': return [3 /*break*/, 27];
                            case '!54x2': return [3 /*break*/, 28];
                            case '@54x2': return [3 /*break*/, 28];
                        }
                        return [3 /*break*/, 38];
                    case 1:
                        commands = this.commands.join(', ');
                        msg.reply(Utils_1.embeddedInstance("Current available commands:", commands));
                        return [3 /*break*/, 39];
                    case 2:
                        if (!(messages.length === 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userInstance.getUser(id)];
                    case 3:
                        user = _c.sent();
                        msg.reply(Utils_1.embeddedInstance(username + "'s wallet:", "RS3: " + Utils_1.minifyBalance(user.BalanceRs) + "\nOSRS: " + Utils_1.minifyBalance(user.BalanceOsrs)));
                        return [3 /*break*/, 7];
                    case 4:
                        if (!(messages.length === 2)) return [3 /*break*/, 7];
                        if (!mentionedMember) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.userInstance.getUser(mentionedMember.user.id)];
                    case 5:
                        user = _c.sent();
                        msg.reply(Utils_1.embeddedInstance(mentionedMember.displayName + "'s wallet:", "RS3: " + Utils_1.minifyBalance(user.BalanceRs) + "\nOSRS: " + Utils_1.minifyBalance(user.BalanceOsrs)));
                        return [3 /*break*/, 7];
                    case 6:
                        msg.reply(Utils_1.embeddedError("Please select a user to check his wallet."));
                        _c.label = 7;
                    case 7: return [3 /*break*/, 39];
                    case 8:
                        if (!(messages.length === 4)) return [3 /*break*/, 13];
                        depositRole = msg.member.roles.find(function (role) { return role.id === process.env.DISCORD_CASHIER_GROUP_ID; });
                        if (messages[1] !== '07' && messages[1] !== 'rs3') {
                            msg.reply(Utils_1.embeddedError("Invalid server to deposit on."));
                            return [2 /*return*/];
                        }
                        if (Utils_1.getAmount(messages[2]) === 0) {
                            msg.reply(Utils_1.embeddedError("Invalid amount to deposit."));
                            return [2 /*return*/];
                        }
                        if (!messages[2].includes('k') && !messages[2].includes('m') && !messages[2].includes('b')) {
                            msg.reply(Utils_1.embeddedError("Invalid currency to use."));
                            return [2 /*return*/];
                        }
                        if (!depositRole) {
                            msg.reply(Utils_1.embeddedError("You do not have access to deposit funds."));
                            return [2 /*return*/];
                        }
                        if (!mentionedMember) {
                            msg.reply(Utils_1.embeddedError("Please select a user to add funds to their wallet."));
                            return [2 /*return*/];
                        }
                        if (!messages[3].includes(mentionedMember.user.id)) {
                            msg.reply(Utils_1.embeddedError("User id doesn't match mentioned user."));
                            return [2 /*return*/];
                        }
                        _c.label = 9;
                    case 9:
                        _c.trys.push([9, 12, , 13]);
                        return [4 /*yield*/, this.userInstance.getUser(mentionedMember.user.id)];
                    case 10:
                        targetUser = _c.sent();
                        osrs = messages[1] === '07';
                        targetCurrentBalance = osrs ? targetUser.BalanceOsrs : targetUser.BalanceRs;
                        amountToAdd = Utils_1.getAmount(messages[2]) * Utils_1.getMultiplier(messages[2]);
                        newBalance = amountToAdd + targetCurrentBalance;
                        return [4 /*yield*/, this.userInstance.updateUser(mentionedMember.user.id, osrs, newBalance)];
                    case 11:
                        updateBalance = _c.sent();
                        msg.reply(Utils_1.embeddedInstance("CashIn", "Successfully deposited " + messages[2] + " to " + mentionedMember + "'s " + Utils_1.getServer(osrs) + " wallet."));
                        return [3 /*break*/, 13];
                    case 12:
                        error_1 = _c.sent();
                        console.log(error_1);
                        return [3 /*break*/, 13];
                    case 13: return [3 /*break*/, 39];
                    case 14:
                        if (!(messages.length === 4)) return [3 /*break*/, 19];
                        depositRole = msg.member.roles.find(function (role) { return role.id === process.env.DISCORD_CASHIER_GROUP_ID; });
                        if (messages[1] !== '07' && messages[1] !== 'rs3') {
                            msg.reply(Utils_1.embeddedError("Invalid server to withdraw from."));
                            return [2 /*return*/];
                        }
                        if (Utils_1.getAmount(messages[2]) === 0) {
                            msg.reply(Utils_1.embeddedError("Invalid amount to withdraw."));
                            return [2 /*return*/];
                        }
                        if (!messages[2].includes('k') && !messages[2].includes('m') && !messages[2].includes('b')) {
                            msg.reply(Utils_1.embeddedError("Invalid currency to use."));
                            return [2 /*return*/];
                        }
                        if (!depositRole) {
                            msg.reply(Utils_1.embeddedError("You do not have access to withdraw funds."));
                            return [2 /*return*/];
                        }
                        if (!mentionedMember) {
                            msg.reply(Utils_1.embeddedError("Please select a user to withdraw funds from their wallet."));
                            return [2 /*return*/];
                        }
                        if (!messages[3].includes(mentionedMember.user.id)) {
                            msg.reply(Utils_1.embeddedError("User id doesn't match mentioned user."));
                            return [2 /*return*/];
                        }
                        _c.label = 15;
                    case 15:
                        _c.trys.push([15, 18, , 19]);
                        return [4 /*yield*/, this.userInstance.getUser(mentionedMember.user.id)];
                    case 16:
                        targetUser = _c.sent();
                        osrs = messages[1] === '07';
                        targetCurrentBalance = osrs ? targetUser.BalanceOsrs : targetUser.BalanceRs;
                        amountToDeduce = Utils_1.getAmount(messages[2]) * Utils_1.getMultiplier(messages[2]);
                        newBalance = targetCurrentBalance - amountToDeduce;
                        if (newBalance < 0) {
                            msg.reply(Utils_1.embeddedError("User cannot withdraw more than available funds in their wallet."));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.userInstance.updateUser(mentionedMember.user.id, osrs, newBalance)];
                    case 17:
                        updateBalance = _c.sent();
                        msg.reply(Utils_1.embeddedInstance("CashOut", "Successfully withdrew " + messages[2] + " from " + mentionedMember + "'s " + Utils_1.getServer(osrs) + " wallet."));
                        return [3 /*break*/, 19];
                    case 18:
                        error_2 = _c.sent();
                        console.log(error_2);
                        return [3 /*break*/, 19];
                    case 19: return [3 /*break*/, 39];
                    case 20:
                        if (!(messages.length === 1)) return [3 /*break*/, 22];
                        return [4 /*yield*/, this.userInstance.getUserPairs(id)];
                    case 21:
                        pairs = _c.sent();
                        pair = pairs[0];
                        reply = "__Server hash__: **" + pair.ServerHash + "**\n";
                        reply += "__Client seed__: **" + pair.UserSeed + "**\n";
                        msg.reply(Utils_1.embeddedInstance("Current pair:", reply, '00ffef'));
                        _c.label = 22;
                    case 22: return [3 /*break*/, 39];
                    case 23:
                        if (!(messages.length === 1)) return [3 /*break*/, 26];
                        return [4 /*yield*/, this.userInstance.getUserPairs(id)];
                    case 24:
                        pairs = _c.sent();
                        pair = pairs[0];
                        return [4 /*yield*/, this.gamesInstance.voidPair(pair.Id)];
                    case 25:
                        result = _c.sent();
                        newPair = pairs[1];
                        reply = "__Server hash__: **" + newPair.ServerHash + "**\n";
                        reply += "__Client seed__: **" + newPair.UserSeed + "**\n";
                        msg.reply(Utils_1.embeddedInstance("New generated pair:", reply, '00ffef'));
                        _c.label = 26;
                    case 26: return [3 /*break*/, 39];
                    case 27:
                        if (messages.length === 3) {
                            reply = "__Server seed__: **" + messages[1] + "**\n";
                            reply += "__Server hash__: **" + Utils_1.generateHash(messages[1], messages[2]) + "**\n";
                            reply += "__Client seed__: **" + messages[2] + "**\n";
                            reply += "__Result__: **" + Utils_1.roll(messages[1], messages[2]) + "**";
                            msg.reply(Utils_1.embeddedInstance("Provably Fair - Result verification:", reply, '00ffef'));
                        }
                        return [3 /*break*/, 39];
                    case 28:
                        if (!(messages.length === 3)) return [3 /*break*/, 37];
                        // const depositRole: Discord.Role = sender.roles.find(role => role.id === process.env.DISCORD_CASHIER_GROUP_ID);
                        if (messages[1] !== '07' && messages[1] !== 'rs3') {
                            msg.reply(Utils_1.embeddedError("Invalid server."));
                            return [2 /*return*/];
                        }
                        if (Utils_1.getAmount(messages[2]) === 0) {
                            msg.reply(Utils_1.embeddedError("Invalid amount."));
                            return [2 /*return*/];
                        }
                        if (!messages[2].includes('k') && !messages[2].includes('m') && !messages[2].includes('b')) {
                            msg.reply(Utils_1.embeddedError("Invalid currency to use."));
                            return [2 /*return*/];
                        }
                        _c.label = 29;
                    case 29:
                        _c.trys.push([29, 36, , 37]);
                        return [4 /*yield*/, this.userInstance.getUser(id)];
                    case 30:
                        targetUser = _c.sent();
                        osrs = messages[1] === '07';
                        targetCurrentBalance = osrs ? targetUser.BalanceOsrs : targetUser.BalanceRs;
                        amountToDeduce = Utils_1.getAmount(messages[2]) * Utils_1.getMultiplier(messages[2]);
                        if (targetCurrentBalance - amountToDeduce < 0) {
                            msg.reply(Utils_1.embeddedError("Insufficient funds."));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.userInstance.getUserPairs(id)];
                    case 31:
                        pairs = _c.sent();
                        pair = pairs[0];
                        profit = pair.Result > 54 ? +amountToDeduce : -amountToDeduce;
                        return [4 /*yield*/, this.gamesInstance.addGame(pair.Id, "" + profit, '54x2', Utils_1.getServer(osrs))];
                    case 32:
                        _c.sent();
                        newBalance = targetCurrentBalance + profit;
                        return [4 /*yield*/, this.userInstance.updateUser(id, osrs, newBalance)];
                    case 33:
                        updateBalance = _c.sent();
                        return [4 /*yield*/, this.gamesInstance.voidPair(pair.Id)];
                    case 34:
                        voidPair = _c.sent();
                        reply = "__Server seed revealed__: **" + pair.ServerSeed + "**\n";
                        reply += "__Server hash__: **" + pair.ServerHash + "**\n";
                        reply += "__Client seed__: **" + pair.UserSeed + "**\n";
                        reply += "__Result__: **" + pair.Result + "**\n";
                        reply += "You have rolled a " + pair.Result + ", you have " + (pair.Result > 54 ? 'won' : 'lost') + "!\n";
                        reply += "To verify the result: !verify **serverSeed** **clientSeed**";
                        return [4 /*yield*/, msg.reply(Utils_1.embeddedInstance('Game results', reply))];
                    case 35:
                        sentMessage = _c.sent();
                        return [3 /*break*/, 37];
                    case 36:
                        error_3 = _c.sent();
                        console.log(error_3);
                        return [3 /*break*/, 37];
                    case 37: return [3 /*break*/, 39];
                    case 38: return [3 /*break*/, 39];
                    case 39: return [2 /*return*/];
                }
            });
        });
    };
    return Responses;
}());
exports.Responses = Responses;
//# sourceMappingURL=Responses.js.map