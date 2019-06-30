import * as Discord from 'discord.js';
import { IDatabase } from '../interfaces/IDatabase';
import { IUser } from '../interfaces/IUser';
import { User as userModel } from '../models/User.model';
import * as mysql from 'mysql';
import { generateRandomString, generateHash, roll, embeddedInstance } from '../utils/Utils';

export class User implements IUser {
    dbInstance: IDatabase;
    server: Discord.Guild;
    constructor(dbInstance: IDatabase, server: Discord.Guild) {
        this.dbInstance = dbInstance;
        this.server = server;
    }

    async createNewUser(user: Discord.User, displayMessage = true) {
        const _user = await this.dbInstance.getUser(user.id);
        if (_user[0]) {
            return;
        }
        await this.dbInstance.addUser(user.id);
        const channel: any = this.server.channels.find(ch => ch.id === process.env.DISCORD_GREETING_CHANNEL_ID);
        if (!channel) {
            return;
        }
        if (displayMessage) {
            channel.send(embeddedInstance(`Wallet System`, `Successfully created wallet for ${user}`));
        }
    }

    async getUser(uuid: string): Promise<userModel> {
        const _user = await this.dbInstance.getUser(uuid);
        if (_user[0]) {
            return Promise.resolve(_user[0]);
        }

        await this.dbInstance.addUser(uuid);
        const createdUser = await this.dbInstance.getUser(uuid);
        return Promise.resolve(createdUser[0]);
    }

    async updateUser(uuid: string, osrs: boolean, newBalance: number): Promise<mysql.MysqlError | userModel> {
        return await this.dbInstance.updateUser(uuid, osrs, newBalance);
    }

    async getUserPairs(uuid: string): Promise<mysql.MysqlError | any> {
        const user = await this.getUser(uuid);
        const currentPairs = await this.dbInstance.getPairs(uuid);
        if (currentPairs.length < 50) {
            for (let i = 0; i < 250; i++) {
                const serverSeed = generateRandomString(32);
                const clientSeed = generateRandomString(8);
                const serverHash = generateHash(serverSeed, clientSeed);
                const result = roll(serverSeed, clientSeed);
                await this.dbInstance.addPair(user.Id, serverSeed, serverHash, clientSeed, `${result}`);
            }
        }
        const newPairs = await this.dbInstance.getPairs(user.Uuid);
        return Promise.resolve(newPairs);
    }

    async getUserStatistics(uuid: string, server: string): Promise<mysql.MysqlError | any> {
        const results = await this.dbInstance.getUserStatistics(uuid, server);
        let total = 0;
        results.forEach((result: any) => {
            total += result.Sum;
        });
        return Promise.resolve(total);
    };

    async getUserWeeklyStatistics(uuid: string, server: string, weekNumber: number): Promise<mysql.MysqlError | any> {
        const results = await this.dbInstance.getUserWeeklyStatistics(uuid, server, weekNumber);
        let total = 0;
        results.forEach((result: any) => {
            total += result.Sum;
        });
        return Promise.resolve(total);
    };

    async getUsersWeeklyStatistics(server: string, weekNumber: number): Promise<mysql.MysqlError | any> {
        const results = await this.dbInstance.getUsersWeeklyStatistics(server, weekNumber);
        return Promise.resolve(results);
    };
}