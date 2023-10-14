const discord_servers = "discord_servers"

export const query_create_table_discord = `
    CREATE TABLE ${discord_servers} (
	    ID INTEGER PRIMARY KEY,
	    NAME TEXT NOT NULL,
	    ID_CHANNEL TEXT NOT NULL UNIQUE	    
    );
`;

export const query_select_table_discord = `
        SELECT * FROM ${discord_servers}
`;

export const query_insert_table_discord_server = `
        INSERT INTO ${discord_servers} (NAME,ID_CHANNEL) VALUES (?,?)
`;