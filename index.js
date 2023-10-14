import dotevn from 'dotenv'
import { getApiDolarBlue } from './services/dolarService.js';
import { getImageDolar, builderPath } from './imageUtils.js'
import { DiscordService } from './services/discordService.js'
import { openConnectionDB, closeConnectionDB, getDiscordServers } from './db/db.js';

dotevn.config();

await openConnectionDB();

//const frecuence = process.env.TIMER_MINUTES * 60 * 1000;
const frecuence = 10000;
let last_value_sell = 0;
const discordService = new DiscordService(process.env.TOKEN_DISCORD);
let listServers = [];

const setListServer = async (err, rows) => {
    console.log("Get data servers");
    if (err) {
        throw err;
    }
    listServers = rows;
    closeConnectionDB();
}

await getDiscordServers(setListServer);


discordService.client.on('ready', () => {
    console.log(`Bot is ready as ${discordService.client.user.tag}!!!`);
    setInterval(runBot, frecuence);
})

const CheckValueDolar = (api_value_sell) => {
    return api_value_sell > last_value_sell;
}

const runBot = async () => {

    let data = await getApiDolarBlue();

    if (CheckValueDolar(data.blue.value_sell)) {
        console.log("Devalued...");

        await getImageDolar();

        for (let i = 0; i < listServers.length; i++) {
            const server = listServers[i];

            await discordService.sendFile(
                server.ID_CHANNEL,
                builderPath(process.env.IMG_PATH, process.env.IMG_CROP),
                process.env.IMG_NAME_SEND,
                "Description file")
        }
    }
    else console.log("Not devalued...");

    last_value_sell = data.blue.value_sell;
}



