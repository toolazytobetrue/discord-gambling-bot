import * as Discord from 'discord.js';
import { User } from '../models/User.model';
import * as mysql from 'mysql';

export interface IUser {
    createNewUser(user: Discord.User, displayMessage: boolean): void;
    getUser(uuid: string): Promise<User>;
    getUserPairs(uuid: string): Promise<mysql.MysqlError | any>;
    updateUser(uuid: string, osrs: boolean, newBalance: number): Promise<mysql.MysqlError | User>;
    updateCashier(uuid: string, flag: boolean, minBalance: number, maxLimit: number): Promise<mysql.MysqlError | any>;
    getUsersStatistics(server: string): Promise<mysql.MysqlError | any>;
    getUserStatistics(uuid: string, server: string): Promise<mysql.MysqlError | any>;
    getUserWeeklyStatistics(uuid: string, server: string, weekNumber: number): Promise<mysql.MysqlError | any>;
    getUsersWeeklyStatistics(server: string, weekNumber: number): Promise<mysql.MysqlError | any>;
}