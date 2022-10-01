const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const token = process.env.COMPLETION_DISCORD_TOKEN;
const getCompletions = require('./logic/completions/completionList');

const commands = [];

// Place your client and guild ids here
const clientId = '893594052145053757';
const guildId = '820839514124976168' //'747685844311081001'

const leaderboard = new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Show the players with the highest completion')
    .addStringOption(option => option.setName('guild').setDescription('Limit the leaderboard to a guild'))
    .addStringOption(option => option.setName('player').setDescription('Show the leaderboard position for a specific player'))
    .addStringOption(option => option.setName('mode').setDescription('Limit the leaderboard to players in a specific gamemode').addChoices(
        { name: "All", value: 'all' },
        { name: "Stranded", value: 'island' },
        { name: "Ironman", value: 'ironman' },
        { name: "Bingo", value: 'bingo' }
    ))
    .addStringOption(option => option.setName('category').setDescription('Show the leaderboard for a specific category instead of overall completion').setAutocomplete(true))
    .addIntegerOption(option => option.setName('page').setDescription('Page of the leaderboard'))

const completion = new SlashCommandBuilder()
    .setName('completion')
    .setDescription('Show a players progress in skyblock')
    .addStringOption(option => option.setName('username').setDescription('Minecraft username'))
    .addStringOption(option => option.setName('profile').setDescription('Profile name'))
const levels = new SlashCommandBuilder()
    .setName('levels')
    .setDescription('Show a players skyblock xp')
    .addStringOption(option => option.setName('username').setDescription('Minecraft username'))
    .addStringOption(option => option.setName('profile').setDescription('Profile name'))

const contacts = new SlashCommandBuilder()
    .setName('contacts')
    .setDescription('Shows which abiphone contacts a player unlocked')
    .addStringOption(option => option.setName('username').setDescription('Minecraft username'))
    .addStringOption(option => option.setName('profile').setDescription('Profile name'))

commands.push(leaderboard.toJSON());
commands.push(completion.toJSON());
commands.push(contacts.toJSON());
commands.push(levels.toJSON());


const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {

        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

    } catch (error) {
        console.error(error);
    }
})();