import crypto from "crypto";
import * as Discord from 'discord.js';
export function getMultiplier(message: string): number {
    if (message.includes('k')) {
        return 1e3;
    }
    if (message.includes('m')) {
        return 1e6;
    }
    if (message.includes('b')) {
        return 1e9;
    }

    return 1;
}

export function getAmount(message: string): number {
    if (message.includes('k')) {
        return message.split('k')[0] ? +message.split('k')[0] : 0;
    }
    if (message.includes('m')) {
        return message.split('m')[0] ? +message.split('m')[0] : 0;
    }
    if (message.includes('b')) {
        return message.split('b')[0] ? +message.split('b')[0] : 0;
    }

    return 0;
}

export function getServer(osrs: boolean): string {
    return osrs ? 'OSRS' : 'RS3';
}

export function minifyBalance(balance: number): string {
    if (balance / 1e9 > 1) {
        return `${(balance / 1e9).toFixed(2)}b`;
    }
    if (balance / 1e6 > 1) {
        return `${(balance / 1e6).toFixed(2)}m`;
    }
    if (balance / 1e3 > 1) {
        return `${(balance / 1e3).toFixed(2)}k`;
    }
    return `${balance}`;
}

export function generateRandomString(sizeBytes: number): string {
    return crypto.randomBytes(sizeBytes).toString('hex');
}

export function generateHash(key: string, text: string) {
    return crypto
        .createHmac('sha512', key)
        .update(text)
        .digest('hex');
}

export function roll(key: string, text: string): number {
    // create HMAC using server seed as key and client seed as message
    const hash = crypto
        .createHmac('sha512', key)
        .update(text)
        .digest('hex');
    let index = 0;

    let lucky = parseInt(hash.substring(index * 5, index * 5 + 5), 16);

    // keep grabbing characters from the hash while greater than
    while (lucky >= Math.pow(10, 6)) {
        index++;
        lucky = parseInt(hash.substring(index * 5, index * 5 + 5), 16);

        // if we reach the end of the hash, just default to highest number
        if (index * 5 + 5 > 128) {
            lucky = 9999;
            break;
        }
    }

    lucky %= Math.pow(10, 4);
    lucky /= Math.pow(10, 2);

    return lucky;
};

export function embeddedInstance(title: string, description: string, color = '#00ff00', img = '') {
    return new Discord.RichEmbed()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setImage(img);
}

export function embeddedRollimage(img: string) {
    return new Discord.RichEmbed().setImage(img);
}

export function embeddedError(description: string) {
    return embeddedInstance('Error:', description, '#ff0000');
}