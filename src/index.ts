import *  as dotenv from 'dotenv';
dotenv.config()

import * as Discord from 'discord.js';
import * as responses from './bll/Responses';
import * as mysql from 'mysql';
import * as database from './database/database';
import * as User from './bll/User';
import * as Responses from './bll/Responses';
import { IUser } from './interfaces/IUser';
import { IResponses } from './interfaces/IResponses';
import { IGames } from './interfaces/IGames';
import { generateRandomString, generateHash, roll } from './utils/utils';
import { Games } from './bll/Games';

const options: mysql.ConnectionConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}

const client = new Discord.Client();
const dbInstance = new database.Database(options);
let server: Discord.Guild;
let userInstance: IUser;
let gamesInstance: IGames;
let responsesInstance: IResponses;


client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    await dbInstance.connect();
    server = client.guilds.find(guid => guid.id === process.env.DISCORD_SERVER_ID);
    userInstance = new User.User(dbInstance, server);
    gamesInstance = new Games(dbInstance);
    responsesInstance = new Responses.Responses(server, userInstance, gamesInstance);

    if (!server) {
        return;
    }

    server.members.forEach(async member => {
        await userInstance.createNewUser(member.user, false);
        await userInstance.getUserPairs(member.user.id);
    });

    await generatePairsForEachUser();

});

client.on('message', message => {
    responsesInstance.reply(message)
});
client.on('guildMemberAdd', async member => {
    await userInstance.createNewUser(member.user, true);
    await userInstance.getUserPairs(member.user.id);
});

client.login(process.env.DISCORD_BOT_TOKEN);

async function generatePairsForEachUser() {
    const users = await dbInstance.getUsers();
    users.forEach(async (user: any) => {
        await userInstance.getUserPairs(user.Uuid);
    });
} 