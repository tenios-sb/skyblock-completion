const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

const BaseCommand = require('./baseCommand');
const Player = require('../../logic/player');

class LevelsCommand extends BaseCommand {

    constructor(db) {
        super('levels');
        this.db = db;
    }

    async handleCommand(interaction) {
        await interaction.deferReply().catch(() => console.log('Error defering reply'));
        //find the username 
        const name = interaction.options.getString('username') || interaction.user.username;
        const profile = interaction.options.getString('profile') || 'latest';
        console.log(`Running Levels on ${name} (${profile}) for ${interaction.user?.tag} in ${interaction.guild?.name}`)
        const player = await Player.getPlayerByName(name);
        let playerProfile = player.getProfile(profile);

        if (!playerProfile) {
            this.showErrorMessage(interaction, `Could not find \`${name}\``);
            return;
        }

        //add to db
        this.db.collection('players').updateOne({ _id: player.uuid }, { $set: player.toJsonObject() }, { upsert: true });

        let embed = this.getLevelsEmbed(player.username, playerProfile);
        const selectRow = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('selectProfile')
                .setPlaceholder(playerProfile.name + this.getProfileEmoji(playerProfile.mode))
                .addOptions(player.profiles.map(profile => {
                    return {
                        label: profile.name + this.getProfileEmoji(profile.mode),
                        value: profile.name
                    }
                })));
        let message = await interaction.editReply({ embeds: [embed], components: [selectRow] }).catch(() => console.log('Error sending initial reply'));
        if (!message) return;
        const filter = i => i.user.id === interaction.user.id
        let interactionCollector = message.createMessageComponentCollector({ filter, time: 120_000 })

        interactionCollector.on('collect', async (i) => {
            switch (i.customId) {
                case 'selectProfile':
                    let selectedProfile = i.values[0]
                    playerProfile = player.getProfile(selectedProfile)
                    if (!playerProfile) {
                        this.showErrorMessage(interaction, `Could not find profile \`${selectedProfile}\``);
                        return;
                    }
                    embed = this.getLevelsEmbed(player.username, playerProfile);
                    i.update({ embeds: [embed], components: [selectRow] });
            }
        })
        interactionCollector.on('end', async () => {
            interaction.editReply({ embeds: [embed], components: [] }).catch(() => console.log('Original message deleted'));
        })
    }


    getLevelsEmbed(username, profile) {
        let totalXp = profile.getSkyblockXp();

        const embed = {
            title: `Skyblock Xp for ${username} (${profile.name}${this.getProfileEmoji(profile.mode)})`,
            description: `Skyblock level: **${~~(totalXp / 100)}** (${this.formatNumber(totalXp)} xp)\n*Note: Due to limitations, this currently does not include bank upgrades, and assumes quests and museum are fully completed.*`,
            fields: [{
                name: 'Skyblock Xp sources',
                value: "```yaml\n",
                inline: true
            }],
            footer: {
                text: 'Made by tenios#7042'
            }
        }
        profile.levels.forEach(level => {
            embed.fields[0].value += `${level.name}: ${level.xp} / ${level.max} [${this.formatPercentage(level.xp / level.max, 2)}]\n`;
        })
        embed.fields.forEach(field => field.value += '```');
        return embed;
    }

}

module.exports = LevelsCommand