import sqlite3 from 'sqlite3'
import {
    query_create_table_discord,
    query_select_table_discord,
    query_insert_table_discord_server
} from './query.js';

let dbConection;

export const openConnectionDB = async () => {
    dbConection = new sqlite3.Database(`./db/bot.db`, StatusConnection);
}

const StatusConnection = async (err) => {
    if (err) console.log(err.message);
    console.log("Connection successfully");
}

const createTable = () => { dbConection.run(query_create_table_discord); }


export const getDiscordServers = async (callback) => {

    await dbConection.all(query_select_table_discord, [], callback)
}



const insertNewDiscordServer = (name, idChannel) => {
    const result = dbConection.run(query_insert_table_discord_server, [name, idChannel])
    console.log(result)
}

export const closeConnectionDB = async () => {
    console.log("Close connection db")
    dbConection.close();
}


