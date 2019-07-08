"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("../utils/Utils");
const moment_1 = __importDefault(require("moment"));
class Responses {
    constructor(server, userInstance, gamesInstance, txInstance) {
        this.commands = ['!help', '@help', '!commands', '@commands', '!balance', '@balance',
            '!wallet', '@wallet', '!deposit', '@deposit', '!cashin', '@cashin', '!cashout', '@cashout',
            '!withdraw', '@withdraw', '!pair', '@pair', '!verify', '@verify', '!random', '@random',
            '!statistics', '@statistics',
            '!txs', '@txs', '!transactions', '@transactions',
            '!44x2', '@44x2', '!54x2', '@54x2',
            '!92x10', '@92x10', '!75x3', '@75x3',
            '!weekly', '@weekly',
            '!allowed', '@allowed',
            '!setcashier', '@setcashier',
            '!reset', '@reset'
        ];
        this.server = server;
        this.userInstance = userInstance;
        this.gamesInstance = gamesInstance;
        this.txInstance = txInstance;
    }
    reply(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = msg.content.trim().toLowerCase().split(' ');
            const command = messages[0];
            const mentionedMember = msg.mentions.members !== null ? (msg.mentions.members.size > 0 ? msg.mentions.members.first() : null) : null;
            const now = moment_1.default();
            if (this.commands.indexOf(command) === -1) {
                return;
            }
            const { id, username, tag } = msg.member.user;
            switch (command) {
                case '!commands':
                case '@commands':
                case '!help':
                case '@help':
                    const commands = this.commands.join(', ');
                    msg.reply(Utils_1.embeddedInstance(`Current available commands:`, commands));
                    break;
                case '!balance':
                case '@balance':
                case '!wallet':
                case '@wallet':
                    if (messages.length === 1) {
                        const user = yield this.userInstance.getUser(id);
                        msg.reply(Utils_1.embeddedInstance(`${username}'s wallet:`, `RS3: ${Utils_1.minifyBalance(user.BalanceRs)}\nOSRS: ${Utils_1.minifyBalance(user.BalanceOsrs)}`));
                    }
                    else if (messages.length === 2) {
                        const depositRole = msg.member.roles.find(role => role.id === process.env.DISCORD_CASHIER_GROUP_ID);
                        if (!depositRole) {
                            msg.reply(Utils_1.embeddedError(`You do not have access to view another user's wallet.`));
                            return;
                        }
                        if (mentionedMember) {
                            const user = yield this.userInstance.getUser(mentionedMember.user.id);
                            msg.reply(Utils_1.embeddedInstance(`${mentionedMember.displayName}'s wallet:`, `RS3: ${Utils_1.minifyBalance(user.BalanceRs)}\nOSRS: ${Utils_1.minifyBalance(user.BalanceOsrs)}`));
                        }
                        else {
                            msg.reply(Utils_1.embeddedError(`Please select a user to check his wallet.`));
                        }
                    }
                    break;
                case '!deposit':
                case '@deposit':
                case '!cashin':
                case '@cashin':
                    /**
                     * [@!deposit] [amount] [07/rs3] [target]
                     */
                    if (messages.length === 4) {
                        const server = messages[2];
                        const amount = messages[1];
                        const depositRole = msg.member.roles.find(role => role.id === process.env.DISCORD_CASHIER_GROUP_ID);
                        if (server !== '07' && server !== 'rs3') {
                            msg.reply(Utils_1.embeddedError(`Invalid server to deposit on.`));
                            return;
                        }
                        const osrs = server === '07';
                        if (Utils_1.getAmount(amount) === 0) {
                            msg.reply(Utils_1.embeddedError(`Invalid amount to deposit.`));
                            return;
                        }
                        if (!amount.includes('k') && !amount.includes('m') && !amount.includes('b')) {
                            msg.reply(Utils_1.embeddedError(`Invalid currency to use.`));
                            return;
                        }
                        if (!mentionedMember) {
                            msg.reply(Utils_1.embeddedError(`Please select a user to add funds to their wallet.`));
                            return;
                        }
                        if (!depositRole) {
                            msg.reply(Utils_1.embeddedError(`You do not have access to deposit funds.`));
                            return;
                        }
                        /**
                         *
                        
                         const cashier = await this.userInstance.getUser(id);
    
                        if (getAmount(amount) * getMultiplier(amount) > cashier.MaxCashIn) {
                            msg.reply(embeddedError(`${msg.member.user} cannot cash in more than allowed.`));
                            return;
                        }
    
                        const cashedIn = await this.txInstance.getUserTransactions(id, getServer(osrs), true);
                        const cashedOut = await this.txInstance.getUserTransactions(id, getServer(osrs), false);
                        const toBeAdded = getAmount(amount) * getMultiplier(amount);
                        const available = Math.abs(cashedOut - (cashedIn + toBeAdded));
                        if (-cashier.MinBalance >= -available) {
                            msg.reply(embeddedError(`You have reached your max negative limit.`));
                            return;
                        }
                         */
                        if (!messages[3].includes(mentionedMember.user.id)) {
                            msg.reply(Utils_1.embeddedError(`User id doesn't match mentioned user.`));
                            return;
                        }
                        try {
                            const targetUser = yield this.userInstance.getUser(mentionedMember.user.id);
                            const targetCurrentBalance = osrs ? targetUser.BalanceOsrs : targetUser.BalanceRs;
                            const amountToAdd = Utils_1.getAmount(amount) * Utils_1.getMultiplier(amount);
                            const newBalance = amountToAdd + targetCurrentBalance;
                            const updateBalance = yield this.userInstance.updateUser(mentionedMember.user.id, osrs, newBalance);
                            const addTx = yield this.txInstance.addTransaction(id, mentionedMember.user.id, `${amountToAdd}`, Utils_1.getServer(osrs), true);
                            msg.reply(Utils_1.embeddedInstance(`CashIn`, `Successfully deposited ${amount} to ${mentionedMember}'s ${Utils_1.getServer(osrs)} wallet.`));
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }
                    break;
                case '!cashout':
                case '@cashout':
                case '!withdraw':
                case '@withdraw':
                    if (messages.length === 4) {
                        const server = messages[2];
                        const amount = messages[1];
                        const depositRole = msg.member.roles.find(role => role.id === process.env.DISCORD_CASHIER_GROUP_ID);
                        if (server !== '07' && server !== 'rs3') {
                            msg.reply(Utils_1.embeddedError(`Invalid server to withdraw from.`));
                            return;
                        }
                        if (Utils_1.getAmount(amount) === 0) {
                            msg.reply(Utils_1.embeddedError(`Invalid amount to withdraw.`));
                            return;
                        }
                        if (!amount.includes('k') && !amount.includes('m') && !amount.includes('b')) {
                            msg.reply(Utils_1.embeddedError(`Invalid currency to use.`));
                            return;
                        }
                        const osrs = server === '07';
                        if (!depositRole) {
                            msg.reply(Utils_1.embeddedError(`You do not have access to withdraw funds.`));
                            return;
                        }
                        if (!mentionedMember) {
                            msg.reply(Utils_1.embeddedError(`Please select a user to withdraw funds from their wallet.`));
                            return;
                        }
                        if (!messages[3].includes(mentionedMember.user.id)) {
                            msg.reply(Utils_1.embeddedError(`User id doesn't match mentioned user.`));
                            return;
                        }
                        try {
                            const targetUser = yield this.userInstance.getUser(mentionedMember.user.id);
                            const targetCurrentBalance = osrs ? targetUser.BalanceOsrs : targetUser.BalanceRs;
                            const amountToDeduce = Utils_1.getAmount(amount) * Utils_1.getMultiplier(amount);
                            const newBalance = targetCurrentBalance - amountToDeduce;
                            if (newBalance < 0) {
                                msg.reply(Utils_1.embeddedError(`User cannot withdraw more than available funds in their wallet.`));
                                return;
                            }
                            const updateBalance = yield this.userInstance.updateUser(mentionedMember.user.id, osrs, newBalance);
                            const addTx = yield this.txInstance.addTransaction(id, mentionedMember.user.id, `-${amountToDeduce}`, Utils_1.getServer(osrs), false);
                            msg.reply(Utils_1.embeddedInstance(`CashOut`, `Successfully withdrew ${amount} from ${mentionedMember}'s ${Utils_1.getServer(osrs)} wallet.`));
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }
                    break;
                case '!weekly':
                case '@weekly':
                    if (messages.length == 2) {
                        const server = messages[1];
                        if (server !== '07' && server !== 'rs3') {
                            msg.reply(Utils_1.embeddedError(`Invalid server to check statistics on.`));
                            return;
                        }
                        let serverType = server === '07' ? 'OSRS' : 'RS3';
                        const results = yield this.userInstance.getUsersWeeklyStatistics(serverType, now.week() - 1);
                        let reply = '';
                        if (results.length > 0) {
                            for (let i = 0; i < results.length; i++) {
                                const result = results[i];
                                const user = this.server.members.find(member => member.id === result.Uuid);
                                reply += `**#${i + 1} ${user ? user : result.Uuid}** - ${Utils_1.minifyBalance(result.Sum)}\n`;
                            }
                        }
                        msg.reply(Utils_1.embeddedInstance(`__Top 10 players statistics (week ${now.week()})__:`, reply, '00ffef'));
                    }
                    break;
                case '!statistics':
                case '@statistics':
                    if (messages.length >= 2) {
                        const server = messages[1];
                        if (server !== '07' && server !== 'rs3') {
                            msg.reply(Utils_1.embeddedError(`Invalid server to check statistics on.`));
                            return;
                        }
                        let serverType = server === '07' ? 'OSRS' : 'RS3';
                        const results = yield this.userInstance.getUsersStatistics(serverType);
                        let reply = '';
                        if (results.length === 1) {
                            if (results[0].Id === null) {
                                reply = 'No data to display';
                            }
                            else {
                                for (let i = 0; i < results.length; i++) {
                                    const result = results[i];
                                    const user = this.server.members.find(member => member.id === result.Uuid);
                                    reply += `**#${i + 1} ${user ? user : result.Uuid}** - ${Utils_1.minifyBalance(result.Sum)}\n`;
                                }
                            }
                        }
                        msg.reply(Utils_1.embeddedInstance(`__Top 10 players statistics__:`, reply, '00ffef'));
                    }
                    break;
                case '!pair':
                case '@pair':
                    if (messages.length === 1) {
                        const pairs = yield this.userInstance.getUserPairs(id);
                        const pair = pairs[0];
                        let reply = `__Server hash__: **${pair.ServerHash}**\n`;
                        reply += `__Client seed__: **${pair.UserSeed}**\n`;
                        msg.reply(Utils_1.embeddedInstance(`Current pair:`, reply, '00ffef'));
                    }
                    break;
                case '!random':
                case '@random':
                    if (messages.length === 1) {
                        const pairs = yield this.userInstance.getUserPairs(id);
                        const pair = pairs[0];
                        const result = yield this.gamesInstance.voidPair(pair.Id);
                        const newPair = pairs[1];
                        let reply = `__Server hash__: **${newPair.ServerHash}**\n`;
                        reply += `__Client seed__: **${newPair.UserSeed}**\n`;
                        msg.reply(Utils_1.embeddedInstance(`New generated pair:`, reply, '00ffef'));
                    }
                    break;
                case '!verify':
                case '@verify':
                    if (messages.length === 3) {
                        let reply = `__Server seed__: **${messages[1]}**\n`;
                        reply += `__Server hash__: **${Utils_1.generateHash(messages[1], messages[2])}**\n`;
                        reply += `__Client seed__: **${messages[2]}**\n`;
                        reply += `__Result__: **${Utils_1.roll(messages[1], messages[2])}**`;
                        msg.reply(Utils_1.embeddedInstance(`Provably Fair - Result verification:`, reply, '00ffef'));
                    }
                    break;
                case '!allowed':
                case '@allowed':
                    if (messages.length === 1) {
                        const user = yield this.userInstance.getUser(id);
                        if (!user.IsCashier) {
                            msg.reply(Utils_1.embeddedError(`You do not have access to view allowed min balance & max cash in.`));
                            return;
                        }
                        let reply = `__Max cash in__: **${Utils_1.minifyBalance(user.MaxCashIn)}**\n`;
                        reply += `__Max negative balance__: **${Utils_1.minifyBalance(user.MinBalance)}**`;
                        msg.reply(Utils_1.embeddedInstance(`Cashier allowance`, reply, '00ffef'));
                    }
                    break;
                case '!44x2':
                case '@44x2':
                case '!54x2':
                case '@54x2':
                case '!75x3':
                case '@75x3':
                case '!92x10':
                case '@92x10':
                    if (messages.length === 3) {
                        // const depositRole: Discord.Role = sender.roles.find(role => role.id === process.env.DISCORD_CASHIER_GROUP_ID);
                        const server = messages[2];
                        const amount = messages[1];
                        if (server !== '07' && server !== 'rs3') {
                            msg.reply(Utils_1.embeddedError(`Invalid server.`));
                            return;
                        }
                        if (Utils_1.getAmount(amount) === 0) {
                            msg.reply(Utils_1.embeddedError(`Invalid amount.`));
                            return;
                        }
                        if (!amount.includes('k') && !amount.includes('m') && !amount.includes('b')) {
                            msg.reply(Utils_1.embeddedError(`Invalid currency to use.`));
                            return;
                        }
                        try {
                            const targetUser = yield this.userInstance.getUser(id);
                            const osrs = server === '07';
                            const targetBeforeBetBalance = osrs ? targetUser.BalanceOsrs : targetUser.BalanceRs;
                            const amountToDeduce = Utils_1.getAmount(amount) * Utils_1.getMultiplier(amount);
                            if (targetBeforeBetBalance - amountToDeduce < 0) {
                                msg.reply(Utils_1.embeddedError(`Insufficient funds.`));
                                return;
                            }
                            const beforeBetBalance = targetBeforeBetBalance - amountToDeduce;
                            const updateBeforeBet = yield this.userInstance.updateUser(id, osrs, beforeBetBalance);
                            let rewardMultiplier = 1;
                            let rewardMinimum = 54;
                            switch (messages[0]) {
                                case '!44x2':
                                case '@44x2':
                                    rewardMultiplier = 2;
                                    rewardMinimum = 44;
                                    break;
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
                            const amountToAdd = +amountToDeduce * rewardMultiplier;
                            const pairs = yield this.userInstance.getUserPairs(id);
                            const pair = pairs[0];
                            let winBool = false;
                            if (rewardMinimum === 54 || rewardMinimum === 75 || rewardMinimum === 92) {
                                winBool = pair.Result > rewardMinimum;
                            }
                            else {
                                winBool = pair.Result < rewardMinimum;
                            }
                            yield this.gamesInstance.addGame(pair.Id, `${+amountToDeduce}`, winBool, Utils_1.getGameType(messages[0]), Utils_1.getServer(osrs));
                            if (winBool) {
                                const user = yield this.userInstance.getUser(id);
                                const targetAfterBetBalance = osrs ? user.BalanceOsrs : user.BalanceRs;
                                const newBalance = targetAfterBetBalance + amountToAdd;
                                const updateBalance = yield this.userInstance.updateUser(id, osrs, newBalance);
                            }
                            const voidPair = yield this.gamesInstance.voidPair(pair.Id);
                            let reply = `__Server seed revealed__: **${pair.ServerSeed}**\n`;
                            reply += `__Server hash__: **${pair.ServerHash}**\n`;
                            reply += `__Client seed__: **${pair.UserSeed}**\n`;
                            reply += `__Result__: **${Math.floor(pair.Result)}**\n`;
                            reply += `You have rolled a **${Math.floor(pair.Result)}**, you have ${winBool ? 'won ' + Utils_1.minifyBalance(+amountToAdd) : 'lost ' + Utils_1.minifyBalance(+amountToDeduce)}!\n`;
                            reply += `To verify the result: !verify **serverSeed** **clientSeed**`;
                            // let sentMessage: any = await msg.reply(embeddedRollimage('https://i.imgur.com/F67CPB8.gif'))
                            // setTimeout(() => {
                            //     sentMessage.edit(embeddedInstance('Game results', reply));
                            // }, 3250);
                            let sentMessage = yield msg.reply(Utils_1.embeddedInstance(`**${Utils_1.getGameType(messages[0])}**`, reply, '00ff00'));
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }
                    break;
                case '!transactions':
                case '@transactions':
                case '!txs':
                case '@txs':
                    if (messages.length == 3) {
                        const server = messages[1];
                        const depositRole = msg.member.roles.find(role => role.id === process.env.DISCORD_CASHIER_GROUP_ID);
                        if (server !== '07' && server !== 'rs3') {
                            msg.reply(Utils_1.embeddedError(`Invalid server to view transactions.`));
                            return;
                        }
                        if (!depositRole) {
                            msg.reply(Utils_1.embeddedError(`You do not have access to view transactions.`));
                            return;
                        }
                        try {
                            const osrs = server === '07';
                            let reply = '';
                            const cashedIn = yield this.txInstance.getUserTransactions(mentionedMember.user.id, Utils_1.getServer(osrs), true);
                            const cashedOut = yield this.txInstance.getUserTransactions(mentionedMember.user.id, Utils_1.getServer(osrs), false);
                            reply += `[${Utils_1.getServer(osrs)}] ${mentionedMember} cashed in ${Utils_1.minifyBalance(cashedIn)}/cashed out ${Utils_1.minifyBalance(cashedOut)}\n`;
                            msg.author.send(Utils_1.embeddedInstance(`Last 50 transactions:`, reply));
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }
                    break;
                case '!reset':
                case '@reset':
                    const adminRole = msg.member.roles.find(role => role.id === process.env.DISCORD_ADMIN_GROUP_ID);
                    if (!adminRole) {
                        msg.reply(Utils_1.embeddedError(`You do not have access to set cashiers.`));
                        return;
                    }
                    if (!mentionedMember) {
                        msg.reply(Utils_1.embeddedError(`Please select a user to delete his transactions.`));
                        return;
                    }
                    if (!messages[1].includes(mentionedMember.user.id)) {
                        msg.reply(Utils_1.embeddedError(`User id doesn't match mentioned user.`));
                        return;
                    }
                    const deleted = yield this.txInstance.deleteTxs(mentionedMember.user.id);
                    let sentMessage = yield msg.reply(Utils_1.embeddedInstance(`**Transactions**`, `Successfully deleted all transactions for ${mentionedMember}.`, '00ff00'));
                    break;
                case '!setcashier':
                case '@setcashier':
                    /**
                     * !setcashier user flag minBalance maxDeposit
                     */
                    if (messages.length == 5) {
                        const adminRole = msg.member.roles.find(role => role.id === process.env.DISCORD_ADMIN_GROUP_ID);
                        if (!adminRole) {
                            msg.reply(Utils_1.embeddedError(`You do not have access to set cashiers.`));
                            return;
                        }
                        if (!mentionedMember) {
                            msg.reply(Utils_1.embeddedError(`Please select a user to withdraw funds from their wallet.`));
                            return;
                        }
                        if (!messages[1].includes(mentionedMember.user.id)) {
                            msg.reply(Utils_1.embeddedError(`User id doesn't match mentioned user.`));
                            return;
                        }
                        if (messages[2] !== 'false' && messages[2] !== 'true') {
                            msg.reply(Utils_1.embeddedError(`Error while setting cashier flag.`));
                            return;
                        }
                        const flag = messages[2] === 'true' ? true : false;
                        const _minBalance = messages[3];
                        const _maxLimit = messages[4];
                        if (Utils_1.getAmount(_minBalance) === 0) {
                            msg.reply(Utils_1.embeddedError(`Invalid amount.`));
                            return;
                        }
                        if (!_minBalance.includes('k') && !_minBalance.includes('m') && !_minBalance.includes('b')) {
                            msg.reply(Utils_1.embeddedError(`Invalid currency to use.`));
                            return;
                        }
                        if (Utils_1.getAmount(_maxLimit) === 0) {
                            msg.reply(Utils_1.embeddedError(`Invalid amount.`));
                            return;
                        }
                        if (!_maxLimit.includes('k') && !_maxLimit.includes('m') && !_maxLimit.includes('b')) {
                            msg.reply(Utils_1.embeddedError(`Invalid currency to use.`));
                            return;
                        }
                        const minBalance = Utils_1.getAmount(_minBalance) * Utils_1.getMultiplier(_minBalance);
                        const maxLimit = Utils_1.getAmount(_maxLimit) * Utils_1.getMultiplier(_maxLimit);
                        try {
                            yield this.userInstance.updateCashier(mentionedMember.user.id, flag, minBalance, maxLimit);
                            const reply = `Successfully did ${flag ? 'set' : 'unset'} ${mentionedMember} ${flag ? 'with max negative balance: ' + Utils_1.minifyBalance(minBalance) + ' and max deposit ' + Utils_1.minifyBalance(maxLimit) : ''}`;
                            let sentMessage = yield msg.reply(Utils_1.embeddedInstance(`**Cashier Update**`, reply, '00ff00'));
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }
                    break;
                default:
                    break;
            }
        });
    }
}
exports.Responses = Responses;
//# sourceMappingURL=Responses.js.map