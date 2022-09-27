const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder } = require('discord.js');

const BaseCommand = require('./baseCommand');
const getLeaderboard = require('../../logic/leaderboards');
const getCategories = require('../../logic/completions/completionList');
const Player = require('../../logic/player');

class LeaderboardCommand extends BaseCommand {

    constructor(db) {
        super('leaderboard');
        this.db = db;
        this.categories = getCategories();
    }

    async handleCommand(interaction) {
        await interaction.deferReply().catch(() => console.log('Error defering reply'));
        //find the username
        let page = Math.max(1, interaction.options.getInteger('page') || 1);
        const player = interaction.options.getString('player');
        const guild = interaction.options.getString('guild');
        let categoryInput = interaction.options.getString('category');
        let category = null;
        this.categories.forEach(c => {
            if (c.id === categoryInput || c.name.toLowerCase() === categoryInput?.toLowerCase()?.trim())
                category = c;
        })
        let mode = interaction.options.getString('mode') || 'all';

        console.log(`Running ${(category?.name || '') + ' '}Leaderboard for ${interaction.user?.tag} in ${interaction.guild?.name}. Guild: ${guild}. Mode: ${mode}`)

        let embed = await this.getLeaderboardEmbed(page, player, guild, mode, category);
        const buttonRow = new ActionRowBuilder().addComponents([
            new ButtonBuilder()
                .setCustomId('first')
                .setLabel('<<')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('back')
                .setLabel('<')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('forward')
                .setLabel('>')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('last')
                .setLabel('>>')
                .setStyle(ButtonStyle.Primary)
        ])

        if (guild)
            buttonRow.addComponents([
                new ButtonBuilder().setCustomId('refresh').setEmoji('🔄').setStyle(ButtonStyle.Success)
            ])
        let message = await interaction.editReply({ embeds: [embed], components: [buttonRow] }).catch(() => console.log('Error sending initial reply'));
        if (!message) return;
        const filter = i => i.user.id === interaction.user.id
        let interactionCollector = message.createMessageComponentCollector({ filter, time: 120_000 })
        const onCollect = async (i) => {
            switch (i.customId) {
                case 'first':
                    page = 1;
                    embed = await this.getLeaderboardEmbed(page, player, guild, mode, category);
                    await i.update({ embeds: [embed], components: [buttonRow] });
                    break;
                case 'back':
                    page = Math.max(1, page - 1);
                    embed = await this.getLeaderboardEmbed(page, player, guild, mode, category);
                    await i.update({ embeds: [embed], components: [buttonRow] });
                    break;
                case 'forward':
                    page += 1;
                    embed = await this.getLeaderboardEmbed(page, player, guild, mode, category);
                    await i.update({ embeds: [embed], components: [buttonRow] });
                    break;
                case 'last':
                    page += 5;
                    embed = await this.getLeaderboardEmbed(page, player, guild, mode, category);
                    await i.update({ embeds: [embed], components: [buttonRow] });
                    break;
                case 'refresh':
                    buttonRow.components[4].data.disabled = true;
                    await i.update({ content: `Leaderboard for ${guild} is getting updated. This might take a bit.`, embeds: [], components: [buttonRow] })
                    await Player.updateGuild(this.db, guild);
                    embed = await this.getLeaderboardEmbed(page, player, guild, mode, category);
                    let followUp = await interaction.followUp({ embeds: [embed], components: [buttonRow] }).catch(() => console.log('Follow up error'))
                    interactionCollector = followUp.createMessageComponentCollector({ filter, time: 120_000 });
                    interactionCollector.on('collect', onCollect)
                    // interactionCollector.on('end', async () => {
                    //     interaction.editReply({ components: [] }).catch(() => console.log('Original message deleted'));
                    // })
                    break;
            }
        }
        interactionCollector.on('collect', onCollect)
        interactionCollector.on('end', async () => {
            interaction.editReply({ components: [] }).catch(() => console.log('Original message deleted'));
        })
    }

    async getLeaderboardEmbed(page, name = null, guild = null, mode = 'all', category = null) {
        let cursor = await getLeaderboard(this.db, page, mode, guild, category?.id);
        let embedString = '```yaml\n';
        let counter = (page - 1) * 20;
        let title = category?.name || 'Completion'
        await cursor.forEach(player => {
            counter++;
            if (name && player.name.toLowerCase() === name.toLowerCase()) {
                embedString += ' > ';
            }
            embedString += counter + ': ';
            embedString += player.name + ': ';
            if (category)
                embedString += this.formatNumber(player.index);
            else
                embedString += this.formatPercentage(player.completion)
            embedString += this.getProfileEmoji(player.mode);
            if (player.guild)
                embedString += ' [' + player.guild + ']';
            embedString += '\n'
        })
        cursor.close();
        if (cursor.length === 0) {
            embedString += '\n'
        }
        embedString += '```'
        const embed = {
            title: `${guild ? guild + ' ' : ''}${title} Leaderboard ${this.getProfileEmoji(mode)}`,
            description: `Players with the highest ${title} checked so far`,
            fields: [{
                name: 'Leaderboard',
                value: embedString,
            }],
            footer: {
                text: `Made by tenios#7042 (Page ${page})`
            }
        }
        return embed;
    }

    async handleAutoComplete(interaction) {
        const prompt = interaction.options.getFocused() || '';
        let words = prompt.split(' ');
        let results = []
        this.categories.forEach(c => {
            if (!(words.some(word => !(c.name.toLowerCase().includes(word.toLowerCase())))))
                results.push({ name: c.name, value: c.id });
        })
        interaction.respond(
            results.slice(0, 25))
    }


}

module.exports = LeaderboardCommand