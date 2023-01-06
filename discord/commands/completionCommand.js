const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');

const BaseCommand = require('./baseCommand');
const Player = require('../../logic/player');

class CompletionCommand extends BaseCommand{

    constructor(db) {
        super('completion');
        this.db = db;
    }

    async handleCommand(interaction) {
        await interaction.deferReply().catch(() => console.log('Error defering reply'));
        //find the username
        const name = interaction.options.getString('username') || interaction.user.username;
        const profile = interaction.options.getString('profile') || 'latest';
        console.log(`Running Completion on ${name} (${profile}) for ${interaction.user?.tag} in ${interaction.guild?.name}`)
        const player = await Player.getPlayerByName(name);
        let playerProfile = player.getProfile(profile);

        if (!playerProfile) {
            this.showErrorMessage(interaction, `Could not find \`${name}\``);
            return;
        }

        //add to db
        this.db.collection('players').updateOne({ _id: player.uuid }, { $set: player.toJsonObject() }, { upsert: true });

        let completed = false;
        let embed = this.getCompletionEmbed(player.username, playerProfile, completed);
        const buttonRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('completed')
                .setLabel('💯')
                .setStyle(ButtonStyle.Primary))
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
        let message = await interaction.editReply({ embeds: [embed], components: [selectRow, buttonRow] }).catch(() => console.log('Error sending initial reply'));
        const filter = i => i.user.id === interaction.user.id
        let interactionCollector = message.createMessageComponentCollector({ filter, time: 120_000 })

        interactionCollector.on('collect', async (i) => {
            switch (i.customId) {
                case 'completed':
                    completed = !completed;
                    embed = this.getCompletionEmbed(player.username, playerProfile, completed)
                    await i.update({ embeds: [embed], components: [selectRow, buttonRow] });
                    break;
                case 'selectProfile':
                    let selectedProfile = i.values[0]
                    playerProfile = player.getProfile(selectedProfile)
                    if (!playerProfile) {
                        this.showErrorMessage(interaction, `Could not find profile \`${selectedProfile}\``);
                        return;
                    }
                    embed = this.getCompletionEmbed(player.username, playerProfile, completed);
                    i.update({ embeds: [embed], components: [selectRow, buttonRow] });
            }
        })
        interactionCollector.on('end', async () => {
            interaction.editReply({ embeds: [embed], components: [] }).catch(() => console.log('Original message deleted'));
        })
    }


    getCompletionEmbed(username, profile, completed) {
        const stranded = profile.mode === 'island';
        let totalCompletion = profile.getOverallCompletion();
        let filtered = profile.completions.filter(completion => (completed ? completion.getCompletion(stranded) >= 1 : completion.getCompletion(stranded) < 1));
        if (stranded) filtered = filtered.filter(comp => comp.strandedMax > 0)
        if (!completed)
            filtered = filtered.sort((first, second) => first.getCompletion(stranded) - second.getCompletion(stranded));

        const embed = {
            title: `Skyblock Completion for ${username} (${profile.name}${this.getProfileEmoji(profile.mode)})`,
            description: `Total Completion: ${this.formatPercentage(totalCompletion)}`,
            fields: [{
                name: completed ? 'Completed' : "Unfinished",
                value: "",
                inline: true
            }],
            footer: {
                text: 'Made by tenios#7042'
            }
        }
        for (let i = 0; i < parseInt((filtered.length - 1) / 30); i++)
            embed.fields.push({
                name: "Even more ".repeat(i + 1) + (completed ? "Completed" : "Unfinished"),
                value: "",
                inline: i % 2 === 0
            })
        if (filtered.length === 0) {
            embed.fields[0].value = '```fix\nNone\n```';
            return embed;
        }
        let i = 0;
        embed.fields.forEach(field => field.value += completed ? '```fix\n' : '```yaml\n');
        let count = 0;
        filtered.forEach(completion => {
            i = parseInt(count / 30);
            if (completed)
                embed.fields[i].value += `${completion.name}\n`;
            else
                embed.fields[i].value += `${completion.name}: ${this.formatPercentage(completion.getCompletion(stranded))}\n`;
            count++;
        })
        embed.fields.forEach(field => field.value += '```');
        return embed;
    }

}

module.exports = CompletionCommand