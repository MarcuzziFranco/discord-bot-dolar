import dotevn from 'dotenv'
import { Client, GatewayIntentBits } from 'discord.js';


let client;

export class DiscordService {

    constructor(token) {
        dotevn.config();
        this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
        this.client.login(token)
    }


    async sendMessage(channelID, message) {
        const channel = this.client.channels.cache.get(channelID);
        if (channel) {
            channel.send(message);
        }
    }

    async sendFile(channelID, pathFile, nameFile, descriptionFile) {
        const channel = this.client.channels.cache.get(channelID);
        if (channel) {
            console.log("Send image");
            channel.send({
                files: [{
                    attachment: pathFile,
                    name: nameFile,
                    description: descriptionFile
                }]
            })
        }
    }

}











