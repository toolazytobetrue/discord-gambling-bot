"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var Discord = __importStar(require("discord.js"));
function getMultiplier(message) {
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
exports.getMultiplier = getMultiplier;
function getAmount(message) {
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
exports.getAmount = getAmount;
function getServer(osrs) {
    return osrs ? 'OSRS' : 'RS3';
}
exports.getServer = getServer;
function minifyBalance(balance) {
    if (balance / 1e9 > 1) {
        return (balance / 1e9).toFixed(2) + "b";
    }
    if (balance / 1e6 > 1) {
        return (balance / 1e6).toFixed(2) + "m";
    }
    if (balance / 1e3 > 1) {
        return (balance / 1e3).toFixed(2) + "k";
    }
    return "" + balance;
}
exports.minifyBalance = minifyBalance;
function generateRandomString(sizeBytes) {
    return crypto_1.default.randomBytes(sizeBytes).toString('hex');
}
exports.generateRandomString = generateRandomString;
function generateHash(key, text) {
    return crypto_1.default
        .createHmac('sha512', key)
        .update(text)
        .digest('hex');
}
exports.generateHash = generateHash;
function roll(key, text) {
    // create HMAC using server seed as key and client seed as message
    var hash = crypto_1.default
        .createHmac('sha512', key)
        .update(text)
        .digest('hex');
    var index = 0;
    var lucky = parseInt(hash.substring(index * 5, index * 5 + 5), 16);
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
}
exports.roll = roll;
;
function embeddedInstance(title, description, color, img) {
    if (color === void 0) { color = '#00ff00'; }
    if (img === void 0) { img = ''; }
    return new Discord.RichEmbed()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setImage(img);
}
exports.embeddedInstance = embeddedInstance;
function embeddedRollimage(img) {
    return new Discord.RichEmbed().setImage(img);
}
exports.embeddedRollimage = embeddedRollimage;
function embeddedError(description) {
    return embeddedInstance('Error:', description, '#ff0000');
}
exports.embeddedError = embeddedError;
//# sourceMappingURL=Utils.js.map