import dotevn from 'dotenv'
import { getApiDolarBlue } from './services/dolarService.js';
import { getImageDolar, builderPath } from './imageUtils.js'
import { DiscordService } from './services/discordService.js'


dotevn.config();
const frecuence = process.env.TIMER_MINUTES * 60 * 1000;
//const frecuence = 10000;
let last_value_sell = 0.0;
const discordService = new DiscordService(process.env.TOKEN_DISCORD);

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
        console.log("Devaluado...");

        await getImageDolar();
        await discordService.sendFile(
            process.env.ID_CHANNEL_DISCORD,
            builderPath(process.env.IMG_PATH, process.env.IMG_CROP),
            process.env.IMG_NAME_SEND,
            "Description file")
    }
    else console.log("No devaluado...");

    last_value_sell = data.blue.value_sell;
}



