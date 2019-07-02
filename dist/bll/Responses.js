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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../utils/Utils");
var moment_1 = __importDefault(require("moment"));
var Responses = /** @class */ (function () {
    function Responses(server, userInstance, gamesInstance, txInstance) {
        this.commands = ['!help', '@help', '!commands', '@commands', '!balance', '@balance',
            '!wallet', '@wallet', '!deposit', '@deposit', '!cashin', '@cashin', '!cashout', '@cashout',
            '!withdraw', '@withdraw', '!54x2', '@54x2', '!pair', '@pair', '!verify', '@verify', '!random', '@random',
            '!statistics', '@statistics', '@weeklystatistics', '!weeklystatistics',
            '!topweekly', '@topweekly', '!txs', '@txs', '!transactions', '@transactions',
            '!92x10', '@92x10', '!75x3', '@75x3'];
        this.server = server;
        this.userInstance = userInstance;
        this.gamesInstance = gamesInstance;
        this.txInstance = txInstance;
    }
    Responses.prototype.reply = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var messages, command, mentionedMember, now, _a, id, username, tag, _b, commands, user, depositRole, user, depositRole, targetUser, osrs, targetCurrentBalance, amountToAdd, newBalance, updateBalance, addTx, error_1, depositRole, targetUser, osrs, targetCurrentBalance, amountToDeduce, newBalance, updateBalance, addTx, error_2, server, results, reply_1, userId, user, server, weeklyStatistics, reply, userId, user, server, statistics, reply, pairs, pair, reply, pairs, pair, result, newPair, reply, reply, targetUser, osrs, targetBeforeBetBalance, amountToDeduce, beforeBetBalance, updateBeforeBet, rewardMultiplier, rewardMinimum, amountToAdd, pairs, pair, user, targetAfterBetBalance, newBalance, updateBalance, voidPair, reply, sentMessage, error_3, depositRole, osrs, cashin, txs, reply_2, error_4;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        messages = msg.content.trim().toLowerCase().split(' ');
                        command = messages[0];
                        mentionedMember = msg.mentions.members !== null ? (msg.mentions.members.size > 0 ? msg.mentions.members.first() : null) : null;
                        now = moment_1.default();
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
                            case '!cashout': return [3 /*break*/, 15];
                            case '@cashout': return [3 /*break*/, 15];
                            case '!withdraw': return [3 /*break*/, 15];
                            case '@withdraw': return [3 /*break*/, 15];
                            case '!topweekly': return [3 /*break*/, 22];
                            case '@topweekly': return [3 /*break*/, 22];
                            case '!weeklystatistics': return [3 /*break*/, 25];
                            case '@weeklystatistics': return [3 /*break*/, 25];
                            case '!statistics': return [3 /*break*/, 28];
                            case '@statistics': return [3 /*break*/, 28];
                            case '!pair': return [3 /*break*/, 31];
                            case '@pair': return [3 /*break*/, 31];
                            case '!random': return [3 /*break*/, 34];
                            case '@random': return [3 /*break*/, 34];
                            case '!verify': return [3 /*break*/, 38];
                            case '@verify': return [3 /*break*/, 38];
                            case '!54x2': return [3 /*break*/, 39];
                            case '@54x2': return [3 /*break*/, 39];
                            case '!75x3': return [3 /*break*/, 39];
                            case '@75x3': return [3 /*break*/, 39];
                            case '!92x10': return [3 /*break*/, 39];
                            case '@92x10': return [3 /*break*/, 39];
                            case '!transactions': return [3 /*break*/, 52];
                            case '@transactions': return [3 /*break*/, 52];
                        }
                        return [3 /*break*/, 57];
                    case 1:
                        commands = this.commands.join(', ');
                        msg.reply(Utils_1.embeddedInstance("Current available commands:", commands));
                        return [3 /*break*/, 58];
                    case 2:
                        if (!(messages.length === 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userInstance.getUser(id)];
                    case 3:
                        user = _c.sent();
                        msg.reply(Utils_1.embeddedInstance(username + "'s wallet:", "RS3: " + Utils_1.minifyBalance(user.BalanceRs) + "\nOSRS: " + Utils_1.minifyBalance(user.BalanceOsrs)));
                        return [3 /*break*/, 7];
                    case 4:
                        if (!(messages.length === 2)) return [3 /*break*/, 7];
                        depositRole = msg.member.roles.find(function (role) { return role.id === process.env.DISCORD_CASHIER_GROUP_ID; });
                        if (!depositRole) {
                            msg.reply(Utils_1.embeddedError("You do not have access to view another user's wallet."));
                            return [2 /*return*/];
                        }
                        if (!mentionedMember) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.userInstance.getUser(mentionedMember.user.id)];
                    case 5:
                        user = _c.sent();
                        msg.reply(Utils_1.embeddedInstance(mentionedMember.displayName + "'s wallet:", "RS3: " + Utils_1.minifyBalance(user.BalanceRs) + "\nOSRS: " + Utils_1.minifyBalance(user.BalanceOsrs)));
                        return [3 /*break*/, 7];
                    case 6:
                        msg.reply(Utils_1.embeddedError("Please select a user to check his wallet."));
                        _c.label = 7;
                    case 7: return [3 /*break*/, 58];
                    case 8:
                        if (!(messages.length === 4)) return [3 /*break*/, 14];
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
                        _c.trys.push([9, 13, , 14]);
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
                        return [4 /*yield*/, this.txInstance.addTransaction(id, mentionedMember.user.id, "" + amountToAdd, Utils_1.getServer(osrs), true)];
                    case 12:
                        addTx = _c.sent();
                        msg.reply(Utils_1.embeddedInstance("CashIn", "Successfully deposited " + messages[2] + " to " + mentionedMember + "'s " + Utils_1.getServer(osrs) + " wallet."));
                        return [3 /*break*/, 14];
                    case 13:
                        error_1 = _c.sent();
                        console.log(error_1);
                        return [3 /*break*/, 14];
                    case 14: return [3 /*break*/, 58];
                    case 15:
                        if (!(messages.length === 4)) return [3 /*break*/, 21];
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
                        _c.label = 16;
                    case 16:
                        _c.trys.push([16, 20, , 21]);
                        return [4 /*yield*/, this.userInstance.getUser(mentionedMember.user.id)];
                    case 17:
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
                    case 18:
                        updateBalance = _c.sent();
                        return [4 /*yield*/, this.txInstance.addTransaction(id, mentionedMember.user.id, "-" + amountToDeduce, Utils_1.getServer(osrs), false)];
                    case 19:
                        addTx = _c.sent();
                        msg.reply(Utils_1.embeddedInstance("CashOut", "Successfully withdrew " + messages[2] + " from " + mentionedMember + "'s " + Utils_1.getServer(osrs) + " wallet."));
                        return [3 /*break*/, 21];
                    case 20:
                        error_2 = _c.sent();
                        console.log(error_2);
                        return [3 /*break*/, 21];
                    case 21: return [3 /*break*/, 58];
                    case 22:
                        if (!(messages.length == 2)) return [3 /*break*/, 24];
                        if (messages[1] !== '07' && messages[1] !== 'rs3') {
                            msg.reply(Utils_1.embeddedError("Invalid server to check statistics on."));
                            return [2 /*return*/];
                        }
                        server = messages[1] === '07' ? 'OSRS' : 'RS3';
                        return [4 /*yield*/, this.userInstance.getUsersWeeklyStatistics(server, now.week())];
                    case 23:
                        results = _c.sent();
                        reply_1 = '';
                        if (results.length === 1) {
                            if (results[0].Id === null) {
                                reply_1 = 'No data to display';
                            }
                            else {
                                results.forEach(function (result) {
                                    var user = _this.server.members.find(function (member) { return member.id === result.Id; });
                                    reply_1 += "**" + user.displayName + "** - " + Utils_1.minifyBalance(result.Sum) + "\n";
                                });
                            }
                        }
                        msg.reply(Utils_1.embeddedInstance("__Top 10 players statistics (week " + now.week() + ")__:", reply_1, '00ffef'));
                        _c.label = 24;
                    case 24: return [3 /*break*/, 58];
                    case 25:
                        if (!(messages.length >= 2)) return [3 /*break*/, 27];
                        userId = messages.length === 2 ? id : mentionedMember.user.id;
                        if (messages[1] !== '07' && messages[1] !== 'rs3') {
                            msg.reply(Utils_1.embeddedError("Invalid server to check statistics on."));
                            return [2 /*return*/];
                        }
                        user = messages.length === 2 ? msg.author.username : mentionedMember.displayName;
                        server = messages[1] === '07' ? 'OSRS' : 'RS3';
                        return [4 /*yield*/, this.userInstance.getUserWeeklyStatistics(userId, server, now.week())];
                    case 26:
                        weeklyStatistics = _c.sent();
                        reply = "__Total profit__ (week " + now.week() + "): **" + Utils_1.minifyBalance(weeklyStatistics) + "**\n";
                        msg.reply(Utils_1.embeddedInstance("__Weekly statistics for__: **" + user + "**", reply, '00ffef'));
                        _c.label = 27;
                    case 27: return [3 /*break*/, 58];
                    case 28:
                        if (!(messages.length >= 2)) return [3 /*break*/, 30];
                        userId = messages.length === 2 ? id : mentionedMember.user.id;
                        if (messages[1] !== '07' && messages[1] !== 'rs3') {
                            msg.reply(Utils_1.embeddedError("Invalid server to check statistics on."));
                            return [2 /*return*/];
                        }
                        user = messages.length === 2 ? msg.author.username : mentionedMember.displayName;
                        server = messages[1] === '07' ? 'OSRS' : 'RS3';
                        return [4 /*yield*/, this.userInstance.getUserStatistics(userId, server)];
                    case 29:
                        statistics = _c.sent();
                        reply = "__Total profit__: **" + Utils_1.minifyBalance(statistics) + "**\n";
                        msg.reply(Utils_1.embeddedInstance("__All time statistics for__: **" + user + "**", reply, '00ffef'));
                        _c.label = 30;
                    case 30: return [3 /*break*/, 58];
                    case 31:
                        if (!(messages.length === 1)) return [3 /*break*/, 33];
                        return [4 /*yield*/, this.userInstance.getUserPairs(id)];
                    case 32:
                        pairs = _c.sent();
                        pair = pairs[0];
                        reply = "__Server hash__: **" + pair.ServerHash + "**\n";
                        reply += "__Client seed__: **" + pair.UserSeed + "**\n";
                        msg.reply(Utils_1.embeddedInstance("Current pair:", reply, '00ffef'));
                        _c.label = 33;
                    case 33: return [3 /*break*/, 58];
                    case 34:
                        if (!(messages.length === 1)) return [3 /*break*/, 37];
                        return [4 /*yield*/, this.userInstance.getUserPairs(id)];
                    case 35:
                        pairs = _c.sent();
                        pair = pairs[0];
                        return [4 /*yield*/, this.gamesInstance.voidPair(pair.Id)];
                    case 36:
                        result = _c.sent();
                        newPair = pairs[1];
                        reply = "__Server hash__: **" + newPair.ServerHash + "**\n";
                        reply += "__Client seed__: **" + newPair.UserSeed + "**\n";
                        msg.reply(Utils_1.embeddedInstance("New generated pair:", reply, '00ffef'));
                        _c.label = 37;
                    case 37: return [3 /*break*/, 58];
                    case 38:
                        if (messages.length === 3) {
                            reply = "__Server seed__: **" + messages[1] + "**\n";
                            reply += "__Server hash__: **" + Utils_1.generateHash(messages[1], messages[2]) + "**\n";
                            reply += "__Client seed__: **" + messages[2] + "**\n";
                            reply += "__Result__: **" + Utils_1.roll(messages[1], messages[2]) + "**";
                            msg.reply(Utils_1.embeddedInstance("Provably Fair - Result verification:", reply, '00ffef'));
                        }
                        return [3 /*break*/, 58];
                    case 39:
                        if (!(messages.length === 3)) return [3 /*break*/, 51];
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
                        _c.label = 40;
                    case 40:
                        _c.trys.push([40, 50, , 51]);
                        return [4 /*yield*/, this.userInstance.getUser(id)];
                    case 41:
                        targetUser = _c.sent();
                        osrs = messages[1] === '07';
                        targetBeforeBetBalance = osrs ? targetUser.BalanceOsrs : targetUser.BalanceRs;
                        amountToDeduce = Utils_1.getAmount(messages[2]) * Utils_1.getMultiplier(messages[2]);
                        if (targetBeforeBetBalance - amountToDeduce < 0) {
                            msg.reply(Utils_1.embeddedError("Insufficient funds."));
                            return [2 /*return*/];
                        }
                        beforeBetBalance = targetBeforeBetBalance - amountToDeduce;
                        return [4 /*yield*/, this.userInstance.updateUser(id, osrs, beforeBetBalance)];
                    case 42:
                        updateBeforeBet = _c.sent();
                        rewardMultiplier = 1;
                        rewardMinimum = 54;
                        switch (messages[0]) {
                            case '!54x2':
                            case '@54x2':
                                rewardMultiplier = 2;
                                rewardMinimum = 54;
                                break;
                            case '!75x3':
                            case '@75x3':
                                rewardMultiplier = 3;
                                rewardMinimum = 75;
                                break;
                            case '!92x10':
                            case '@92x10':
                                rewardMultiplier = 10;
                                rewardMinimum = 92;
                                break;
                        }
                        amountToAdd = +amountToDeduce * rewardMultiplier;
                        return [4 /*yield*/, this.userInstance.getUserPairs(id)];
                    case 43:
                        pairs = _c.sent();
                        pair = pairs[0];
                        if (!(pair.Result > rewardMinimum)) return [3 /*break*/, 47];
                        return [4 /*yield*/, this.gamesInstance.addGame(pair.Id, "" + amountToAdd, '54x2', Utils_1.getServer(osrs))];
                    case 44:
                        _c.sent();
                        return [4 /*yield*/, this.userInstance.getUser(id)];
                    case 45:
                        user = _c.sent();
                        targetAfterBetBalance = osrs ? user.BalanceOsrs : user.BalanceRs;
                        newBalance = targetAfterBetBalance + amountToAdd;
                        return [4 /*yield*/, this.userInstance.updateUser(id, osrs, newBalance)];
                    case 46:
                        updateBalance = _c.sent();
                        _c.label = 47;
                    case 47: return [4 /*yield*/, this.gamesInstance.voidPair(pair.Id)];
                    case 48:
                        voidPair = _c.sent();
                        reply = "||__Server seed revealed__: **" + pair.ServerSeed + "**\n";
                        reply += "__Server hash__: **" + pair.ServerHash + "**\n";
                        reply += "__Client seed__: **" + pair.UserSeed + "**\n";
                        reply += "__Result__: **" + pair.Result + "**\n";
                        reply += "You have rolled a " + pair.Result + ", you have " + (pair.Result > rewardMinimum ? 'won ' + Utils_1.minifyBalance(+amountToAdd) : 'lost ' + Utils_1.minifyBalance(-amountToDeduce)) + "!\n";
                        reply += "To verify the result: !verify **serverSeed** **clientSeed**||";
                        return [4 /*yield*/, msg.reply(Utils_1.embeddedInstance('Game results', reply))];
                    case 49:
                        sentMessage = _c.sent();
                        return [3 /*break*/, 51];
                    case 50:
                        error_3 = _c.sent();
                        console.log(error_3);
                        return [3 /*break*/, 51];
                    case 51: return [3 /*break*/, 58];
                    case 52:
                        if (!(messages.length === 3)) return [3 /*break*/, 56];
                        depositRole = msg.member.roles.find(function (role) { return role.id === process.env.DISCORD_CASHIER_GROUP_ID; });
                        if (messages[1] !== '07' && messages[1] !== 'rs3') {
                            msg.reply(Utils_1.embeddedError("Invalid server to view transactions."));
                            return [2 /*return*/];
                        }
                        if (messages[2] !== 'in' && messages[2] !== 'out') {
                            msg.reply(Utils_1.embeddedError("Invalid cashing method."));
                            return [2 /*return*/];
                        }
                        if (!depositRole) {
                            msg.reply(Utils_1.embeddedError("You do not have access to view transactions."));
                            return [2 /*return*/];
                        }
                        _c.label = 53;
                    case 53:
                        _c.trys.push([53, 55, , 56]);
                        osrs = messages[1] === '07';
                        cashin = messages[2] === 'in';
                        return [4 /*yield*/, this.txInstance.getTransactions(Utils_1.getServer(osrs), cashin)];
                    case 54:
                        txs = _c.sent();
                        reply_2 = '';
                        txs.forEach(function (tx) {
                            var cashier = _this.server.members.find(function (member) { return member.id === tx.CashierUuid; });
                            var member = _this.server.members.find(function (member) { return member.id === tx.UserUuid; });
                            var verb = tx.CashIn ? 'cashed in' : 'cashed out';
                            reply_2 += (cashier ? cashier : tx.CashierUuid) + " " + verb + " " + Utils_1.minifyBalance(tx.Amount) + " " + tx.Server + " for " + (member ? member : tx.UserUuid) + "\n";
                        });
                        msg.author.send(Utils_1.embeddedInstance("Last 50 transactions:", reply_2));
                        return [3 /*break*/, 56];
                    case 55:
                        error_4 = _c.sent();
                        console.log(error_4);
                        return [3 /*break*/, 56];
                    case 56: return [3 /*break*/, 58];
                    case 57: return [3 /*break*/, 58];
                    case 58: return [2 /*return*/];
                }
            });
        });
    };
    return Responses;
}());
exports.Responses = Responses;
//# sourceMappingURL=Responses.js.map