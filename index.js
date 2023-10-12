require('dotenv').config()
const imageUtils = require('./imageUtils')
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

//const frecuence = process.env.TIMER_MINUTES * 60 * 1000;
const frecuence = 10000;

let last_value_sell = 0.0;

client.on('ready', () => {
    console.log(`Bot is ready as ${client.user.tag}!!!`);
    setInterval(runBot, frecuence);
})

async function sendFileMessage() {
    const channel = client.channels.cache.get(process.env.ID_CHANNEL_DISCORD);
    if (channel) {
        await imageUtils.getImageDolar();
        console.log("Send image");
        channel.send({
            files: [{
                attachment: imageUtils.builderPath(process.env.IMG_PATH, process.env.IMG_CROP),
                name: process.env.IMG_NAME_SEND,
                description: 'A description of the file'
            }]
        })
    }
}

async function sendMessageString(message) {
    const channel = client.channels.cache.get(process.env.ID_CHANNEL_DISCORD);
    if (channel) {
        channel.send(message);
    }
}


async function sendMessage(dataDolar) {
    const channel = client.channels.cache.get(process.env.ID_CHANNEL_DISCORD);
    if (channel) {
        channel.send(builderMessage(dataDolar));
    }
}


const builderMessage = (dataDolar) => {
    let message = `------------------------------- \n` +
        `BLUE \n` +
        `Compra: ${dataDolar.venta} \n` +
        `Venta: ${dataDolar.compra} \n` +
        `-------------------------------`;
    return message;
}


const CheckValueDolar = (api_value_sell) => {
    return api_value_sell > last_value_sell;
}


const runBot = async () => {

    let data = await getApiDolarBlue();

    if (CheckValueDolar(data.blue.value_sell)) {
        console.log("Devaluado...");
        sendFileMessage();
    }
    else console.log("No devaluado...");

    last_value_sell = data.blue.value_sell;
}



async function getApiDolarBlue() {
    const url = process.env.URL_GET_DOLAR_BLUE
    const options = { method: 'GET', headers: { Accept: 'application/json' } };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

client.login(process.env.TOKEN_DISCORD);
