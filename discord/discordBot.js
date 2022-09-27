const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const CommandHandler = require('./commandHandler');

const token = process.env.COMPLETION_DISCORD_TOKEN;

class Discord {

    constructor(db) {
        this.db = db;
        this.commandHandler = new CommandHandler(this.db);
        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);
        });

        client.on('interactionCreate', async interaction => {
            if (interaction.isChatInputCommand()) {
                this.commandHandler.handleChatInputCommand(interaction);
            } else if (interaction.isAutocomplete()) {
                this.commandHandler.handleAutoComplete(interaction);
            }
        });

        client.login(token);
    }

}
module.exports = Discord