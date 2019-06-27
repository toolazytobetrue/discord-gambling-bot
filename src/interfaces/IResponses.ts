import * as Discord from 'discord.js'
export interface IResponses {
    reply(msg: Discord.Message): void;
}