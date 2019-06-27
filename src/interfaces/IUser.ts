import * as Discord from 'discord.js';
import { User } from '../models/User.model';
import * as mysql from 'mysql';

export interface IUser {
    createNewUser(user: Discord.User, displayMessage: boolean): void;
    getUser(uuid: string): Promise<User>;
    getUserPairs(uuid: string): Promise<mysql.MysqlError | any>;
    updateUser(uuid: string, osrs: boolean, newBalance: number): Promise<mysql.MysqlError | User>;
}