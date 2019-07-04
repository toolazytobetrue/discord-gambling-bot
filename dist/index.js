"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const Discord = __importStar(require("discord.js"));
const database = __importStar(require("./database/database"));
const User = __importStar(require("./bll/User"));
const Responses = __importStar(require("./bll/Responses"));
const Games_1 = require("./bll/Games");
const Transactions_1 = require("./bll/Transactions");
const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};
const client = new Discord.Client();
const dbInstance = new database.Database(options);
let server;
let userInstance;
let gamesInstance;
let responsesInstance;
let txInstance;
client.on('ready', () => __awaiter(this, void 0, void 0, function* () {
    console.log(`Logged in as ${client.user.tag}!`);
    yield dbInstance.connect();
    server = client.guilds.find(guid => guid.id === process.env.DISCORD_SERVER_ID);
    userInstance = new User.User(dbInstance, server);
    gamesInstance = new Games_1.Games(dbInstance);
    txInstance = new Transactions_1.Transactions(dbInstance, userInstance);
    responsesInstance = new Responses.Responses(server, userInstance, gamesInstance, txInstance);
    if (!server) {
        return;
    }
    server.members.forEach((member) => __awaiter(this, void 0, void 0, function* () {
        yield userInstance.createNewUser(member.user, false);
        yield userInstance.getUserPairs(member.user.id);
    }));
    yield generatePairsForEachUser();
}));
client.on('message', message => {
    responsesInstance.reply(message);
});
client.on('guildMemberAdd', (member) => __awaiter(this, void 0, void 0, function* () {
    yield userInstance.createNewUser(member.user, true);
    yield userInstance.getUserPairs(member.user.id);
}));
client.login(process.env.DISCORD_BOT_TOKEN);
function generatePairsForEachUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield dbInstance.getUsers();
        users.forEach((user) => __awaiter(this, void 0, void 0, function* () {
            yield userInstance.getUserPairs(user.Uuid);
        }));
    });
}
//# sourceMappingURL=index.js.map