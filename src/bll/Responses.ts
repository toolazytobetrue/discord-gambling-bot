import * as Discord from "discord.js";
import { IDatabase } from "../interfaces/IDatabase";
import { User } from "../models/User.model";
import { IUser } from "../interfaces/IUSer";
import { minifyBalance, getAmount, getMultiplier, getServer, generateHash, roll, embeddedInstance, embeddedError, embeddedRollimage } from "../utils/Utils";
import { IGames } from "../interfaces/IGames";
import moment from 'moment';
export class Responses {
    server: Discord.Guild;
    userInstance: IUser;
    gamesInstance: IGames;
    commands = ['!help', '@help', '!commands', '@commands', '!balance', '@balance',
        '!wallet', '@wallet', '!deposit', '@deposit', '!cashin', '@cashin', '!cashout', '@cashout',
        '!withdraw', '@withdraw', '!54x2', '@54x2', '!pair', '@pair', '!verify', '@verify', '!random', '@random',
        '!statistics', '@statistics', '@weeklystatistics', '!weeklystatistics',
        '!topweekly', '@topweekly'];

    constructor(server: Discord.Guild, userInstance: IUser, gamesInstance: IGames) {
        this.server = server;
        this.userInstance = userInstance;
        this.gamesInstance = gamesInstance;
    }

    async reply(msg: Discord.Message) {
        const messages = msg.content.trim().toLowerCase().split(' ');
        const command = messages[0];
        const mentionedMember = msg.mentions.members.first();
        const now: moment.Moment = moment();
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
                msg.reply(embeddedInstance(`Current available commands:`, commands));
                break;
            case '!balance':
            case '@balance':
            case '!wallet':
            case '@wallet':
                if (messages.length === 1) {
                    const user: User = await this.userInstance.getUser(id);
                    msg.reply(embeddedInstance(`${username}'s wallet:`, `RS3: ${minifyBalance(user.BalanceRs)}\nOSRS: ${minifyBalance(user.BalanceOsrs)}`));
                } else if (messages.length === 2) {
                    if (mentionedMember) {
                        const user: User = await this.userInstance.getUser(mentionedMember.user.id);
                        msg.reply(embeddedInstance(`${mentionedMember.displayName}'s wallet:`, `RS3: ${minifyBalance(user.BalanceRs)}\nOSRS: ${minifyBalance(user.BalanceOsrs)}`));
                    } else {
                        msg.reply(embeddedError(`Please select a user to check his wallet.`));
                    }
                }
                break;
            case '!deposit':
            case '@deposit':
            case '!cashin':
            case '@cashin':
                /**
                 * [@!deposit] [07/rs3] [amount] [target]
                 */
                if (messages.length === 4) {
                    const depositRole: Discord.Role = msg.member.roles.find(role => role.id === process.env.DISCORD_CASHIER_GROUP_ID);
                    if (messages[1] !== '07' && messages[1] !== 'rs3') {
                        msg.reply(embeddedError(`Invalid server to deposit on.`));
                        return;
                    }

                    if (getAmount(messages[2]) === 0) {
                        msg.reply(embeddedError(`Invalid amount to deposit.`));
                        return;
                    }

                    if (!messages[2].includes('k') && !messages[2].includes('m') && !messages[2].includes('b')) {
                        msg.reply(embeddedError(`Invalid currency to use.`));
                        return;
                    }

                    if (!depositRole) {
                        msg.reply(embeddedError(`You do not have access to deposit funds.`));
                        return;
                    }

                    if (!mentionedMember) {
                        msg.reply(embeddedError(`Please select a user to add funds to their wallet.`));
                        return;
                    }

                    if (!messages[3].includes(mentionedMember.user.id)) {
                        msg.reply(embeddedError(`User id doesn't match mentioned user.`));
                        return;
                    }

                    try {
                        const targetUser = await this.userInstance.getUser(mentionedMember.user.id);
                        const osrs = messages[1] === '07';
                        const targetCurrentBalance = osrs ? targetUser.BalanceOsrs : targetUser.BalanceRs;
                        const amountToAdd = getAmount(messages[2]) * getMultiplier(messages[2]);
                        const newBalance = amountToAdd + targetCurrentBalance;

                        const updateBalance = await this.userInstance.updateUser(mentionedMember.user.id, osrs, newBalance);
                        msg.reply(embeddedInstance(`CashIn`, `Successfully deposited ${messages[2]} to ${mentionedMember}'s ${getServer(osrs)} wallet.`));

                    } catch (error) {
                        console.log(error);
                    }
                }
                break;
            case '!cashout':
            case '@cashout':
            case '!withdraw':
            case '@withdraw':
                if (messages.length === 4) {
                    const depositRole: Discord.Role = msg.member.roles.find(role => role.id === process.env.DISCORD_CASHIER_GROUP_ID);
                    if (messages[1] !== '07' && messages[1] !== 'rs3') {
                        msg.reply(embeddedError(`Invalid server to withdraw from.`));
                        return;
                    }

                    if (getAmount(messages[2]) === 0) {
                        msg.reply(embeddedError(`Invalid amount to withdraw.`));
                        return;
                    }

                    if (!messages[2].includes('k') && !messages[2].includes('m') && !messages[2].includes('b')) {
                        msg.reply(embeddedError(`Invalid currency to use.`));
                        return;
                    }

                    if (!depositRole) {
                        msg.reply(embeddedError(`You do not have access to withdraw funds.`));
                        return;
                    }

                    if (!mentionedMember) {
                        msg.reply(embeddedError(`Please select a user to withdraw funds from their wallet.`));
                        return;
                    }

                    if (!messages[3].includes(mentionedMember.user.id)) {
                        msg.reply(embeddedError(`User id doesn't match mentioned user.`));
                        return;
                    }
                    try {
                        const targetUser = await this.userInstance.getUser(mentionedMember.user.id);
                        const osrs = messages[1] === '07';
                        const targetCurrentBalance = osrs ? targetUser.BalanceOsrs : targetUser.BalanceRs;
                        const amountToDeduce = getAmount(messages[2]) * getMultiplier(messages[2]);
                        const newBalance = targetCurrentBalance - amountToDeduce;
                        if (newBalance < 0) {
                            msg.reply(embeddedError(`User cannot withdraw more than available funds in their wallet.`));
                            return;
                        }
                        const updateBalance = await this.userInstance.updateUser(mentionedMember.user.id, osrs, newBalance);
                        msg.reply(embeddedInstance(`CashOut`, `Successfully withdrew ${messages[2]} from ${mentionedMember}'s ${getServer(osrs)} wallet.`));
                    } catch (error) {
                        console.log(error);
                    }
                }
                break;

            case '!topweekly':
            case '@topweekly':
                if (messages.length == 2) {
                    if (messages[1] !== '07' && messages[1] !== 'rs3') {
                        msg.reply(embeddedError(`Invalid server to check statistics on.`));
                        return;
                    }
                    let server = messages[1] === '07' ? 'OSRS' : 'RS3';
                    const results = await this.userInstance.getUsersWeeklyStatistics(server, now.week())
                    let reply = '';
                    if (results.length === 1) {
                        if (results[0].Id === null) {
                            reply = 'No data to display'
                        } else {
                            results.forEach((result: any) => {
                                const user = this.server.members.find(member => member.id === result.Id);
                                reply += `**${user.displayName}** - ${minifyBalance(result.Sum)}\n`;
                            });
                        }
                    }
                    msg.reply(embeddedInstance(`__Top 10 players statistics (week ${now.week()})__:`, reply, '00ffef'));
                }


                break;

            case '!weeklystatistics':
            case '@weeklystatistics':
                if (messages.length >= 2) {
                    let userId = messages.length === 2 ? id : mentionedMember.user.id;
                    if (messages[1] !== '07' && messages[1] !== 'rs3') {
                        msg.reply(embeddedError(`Invalid server to check statistics on.`));
                        return;
                    }
                    let user = messages.length === 2 ? msg.author.username : mentionedMember.displayName;
                    let server = messages[1] === '07' ? 'OSRS' : 'RS3';
                    let weeklyStatistics = await this.userInstance.getUserWeeklyStatistics(userId, server, now.week());
                    const reply = `__Total profit__ (week ${now.week()}): **${minifyBalance(weeklyStatistics)}**\n`;
                    msg.reply(embeddedInstance(`__Weekly statistics for__: **${user}**`, reply, '00ffef'));
                }

                break;

            case '!statistics':
            case '@statistics':
                if (messages.length >= 2) {
                    let userId = messages.length === 2 ? id : mentionedMember.user.id;
                    if (messages[1] !== '07' && messages[1] !== 'rs3') {
                        msg.reply(embeddedError(`Invalid server to check statistics on.`));
                        return;
                    }
                    let user = messages.length === 2 ? msg.author.username : mentionedMember.displayName;
                    let server = messages[1] === '07' ? 'OSRS' : 'RS3';
                    let statistics = await this.userInstance.getUserStatistics(userId, server);
                    const reply = `__Total profit__: **${minifyBalance(statistics)}**\n`;
                    msg.reply(embeddedInstance(`__All time statistics for__: **${user}**`, reply, '00ffef'));
                }
                break;

            case '!pair':
            case '@pair':
                if (messages.length === 1) {
                    const pairs = await this.userInstance.getUserPairs(id);
                    const pair = pairs[0];
                    let reply = `__Server hash__: **${pair.ServerHash}**\n`;
                    reply += `__Client seed__: **${pair.UserSeed}**\n`;
                    msg.reply(embeddedInstance(`Current pair:`, reply, '00ffef'));
                }
                break;
            case '!random':
            case '@random':
                if (messages.length === 1) {
                    const pairs = await this.userInstance.getUserPairs(id);
                    const pair = pairs[0];
                    const result = await this.gamesInstance.voidPair(pair.Id);
                    const newPair = pairs[1];
                    let reply = `__Server hash__: **${newPair.ServerHash}**\n`;
                    reply += `__Client seed__: **${newPair.UserSeed}**\n`;
                    msg.reply(embeddedInstance(`New generated pair:`, reply, '00ffef'));
                }
                break;
            case '!verify':
            case '@verify':
                if (messages.length === 3) {
                    let reply = `__Server seed__: **${messages[1]}**\n`;
                    reply += `__Server hash__: **${generateHash(messages[1], messages[2])}**\n`;
                    reply += `__Client seed__: **${messages[2]}**\n`;
                    reply += `__Result__: **${roll(messages[1], messages[2])}**`;
                    msg.reply(embeddedInstance(`Provably Fair - Result verification:`, reply, '00ffef'));
                }
                break;
            case '!54x2':
            case '@54x2':
                if (messages.length === 3) {
                    // const depositRole: Discord.Role = sender.roles.find(role => role.id === process.env.DISCORD_CASHIER_GROUP_ID);
                    if (messages[1] !== '07' && messages[1] !== 'rs3') {
                        msg.reply(embeddedError(`Invalid server.`));
                        return;
                    }

                    if (getAmount(messages[2]) === 0) {
                        msg.reply(embeddedError(`Invalid amount.`));
                        return;
                    }

                    if (!messages[2].includes('k') && !messages[2].includes('m') && !messages[2].includes('b')) {
                        msg.reply(embeddedError(`Invalid currency to use.`));
                        return;
                    }

                    try {
                        const targetUser = await this.userInstance.getUser(id);
                        const osrs = messages[1] === '07';
                        const targetCurrentBalance = osrs ? targetUser.BalanceOsrs : targetUser.BalanceRs;
                        const amountToDeduce = getAmount(messages[2]) * getMultiplier(messages[2]);
                        if (targetCurrentBalance - amountToDeduce < 0) {
                            msg.reply(embeddedError(`Insufficient funds.`));
                            return;
                        }

                        const pairs = await this.userInstance.getUserPairs(id);
                        const pair = pairs[0];
                        const profit = pair.Result > 54 ? +amountToDeduce : -amountToDeduce;
                        await this.gamesInstance.addGame(pair.Id, `${profit}`, '54x2', getServer(osrs));
                        const newBalance = targetCurrentBalance + profit;
                        const updateBalance = await this.userInstance.updateUser(id, osrs, newBalance);
                        const voidPair = await this.gamesInstance.voidPair(pair.Id);
                        let reply = `__Server seed revealed__: **${pair.ServerSeed}**\n`;
                        reply += `__Server hash__: **${pair.ServerHash}**\n`;
                        reply += `__Client seed__: **${pair.UserSeed}**\n`;
                        reply += `__Result__: **${pair.Result}**\n`;
                        reply += `You have rolled a ${pair.Result}, you have ${pair.Result > 54 ? 'won' : 'lost'}!\n`;
                        reply += `To verify the result: !verify **serverSeed** **clientSeed**`;

                        let sentMessage = await msg.reply(embeddedRollimage('https://i.imgur.com/F67CPB8.gif'))
                        setTimeout(() => {
                            sentMessage.edit(embeddedInstance('Game results', reply));
                        }, 3250);

                        // let sentMessage = await msg.reply(embeddedInstance('Game results', reply));

                    } catch (error) {
                        console.log(error);
                    }
                }
                break;
            default:
                break;
        }
    }
}