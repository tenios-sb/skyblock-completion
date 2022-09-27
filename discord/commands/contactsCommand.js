const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder } = require('discord.js');

const BaseCommand = require('./baseCommand');
const Player = require('../../logic/player');

class ContactCommand extends BaseCommand {

    constructor(db) {
        super('contacts');
        this.db = db;
        this.contacts = [
            { name: 'Kat', location: 'Found in the Hub Village', method: 'Give her 1x Kat Flower', id: 'pet_sitter', quest: true, },
            { name: 'Aranya', location: 'Found in the Crimson Isles near the Kuudra Skull', method: 'Talk to her', id: 'aranya', quest: false, },
            { name: 'Dusk', location: 'Found in the Hub Village', method: 'Kill a runic enderman', id: 'dusk', quest: true, },
            { name: 'Builder', location: 'Found in the Hub Village', method: 'Give him 1x Builders Wand', id: 'builder', quest: true, },
            { name: 'Oringo', location: 'Found in the Hub Village during Zoo Events', method: 'Give him 64x Silent Pearls', id: 'oringo', quest: true, },
            { name: 'Duncan', location: 'Found in dungeons', method: 'Talk to him', id: 'duncan', quest: false, },
            { name: 'Queen Mismyla', location: 'Found in the Dwarven Mines next to the King', method: 'Give her 1x Royal Pigeon', id: 'queen_mismyla', quest: true, },
            { name: 'Maddox', location: 'Found in the Hub Village', method: 'Give him 1x Maddox Batphone', id: 'slayer', quest: true, },
            { name: 'Ophelia', location: 'Found in the Dungeon Hub', method: 'Give her 1x Catacombs Expert Ring', id: 'ophelia', quest: true, },
            { name: 'Tomioka', location: 'Found in dungeons', method: 'Give them 1x Titanic Experience Bottle', id: 'tomioka', quest: true, },
            { name: 'Trinity', location: 'Found in dungeons in a Rare 1x1', method: 'Give her 2x Revive Stone', id: 'trinity', quest: true, },
            { name: 'Blacksmith', location: 'Found in the Hub Village', method: 'Pay his debt of 32m coins', id: 'blacksmith', quest: true, },
        ]
    }

    async handleCommand(interaction) {
        await interaction.deferReply().catch(() => console.log('Error defering reply'));
        //find the username
        const name = interaction.options.getString('username') || interaction.user.username;
        const profile = interaction.options.getString('profile') || 'latest';
        console.log(`Running Contacts on ${name} (${profile}) for ${interaction.user?.tag} in ${interaction.guild?.name}`)
        const player = await Player.getPlayerByName(name);
        let playerProfile = player.getProfile(profile);

        if (!playerProfile) {
            this.showErrorMessage(interaction, `Could not find \`${name}\``);
            return;
        }

        //add to db
        this.db.collection('players').updateOne({ _id: player.uuid }, { $set: player.toJsonObject() }, { upsert: true });

        let embed = this.getContactEmbed(player.username, playerProfile);
        const selectRow = new ActionRowBuilder().addComponents(
            new SelectMenuBuilder()
                .setCustomId('selectProfile')
                .setPlaceholder(playerProfile.name + this.getProfileEmoji(playerProfile.mode))
                .addOptions(player.profiles.map(profile => {
                    return {
                        label: profile.name + this.getProfileEmoji(profile.mode),
                        value: profile.name
                    }
                })));
        let message = await interaction.editReply({ embeds: [embed], components: [selectRow] }).catch(() => console.log('Error sending initial reply'));
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
                    embed = this.getContactEmbed(player.username, playerProfile);
                    i.update({ embeds: [embed], components: [selectRow] });
            }
        })
        interactionCollector.on('end', async () => {
            interaction.editReply({ embeds: [embed], components: [] }).catch(() => console.log('Original message deleted'));
        })
    }

    getMissingContacts(username, profile) {
        let missingContacts = []
        let data = profile.profileData?.members?.[profile.uuid];
        this.contacts.forEach(contact => {
            if (!(contact.id in (data?.nether_island_player_data?.abiphone?.contact_data || {})) || (contact.quest && !(data?.nether_island_player_data?.abiphone?.contact_data?.[contact.id]?.completed_quest)))
                missingContacts.push(contact);
        })
        return missingContacts;
    }


    getContactEmbed(username, profile) {
        let missingContacts = this.getMissingContacts(username, profile);

        const embed = {
            title: `Abiphone Contact Info for ${username} (${profile.name}${this.getProfileEmoji(profile.mode)})`,
            description: `Missing contacts: ${missingContacts.length}/${this.contacts.length}`,
            fields: missingContacts.map(contact => {
                return {
                    name: contact.name,
                    value: '**Location:**\n' + contact.location + '\n**Unlock:**\n' + contact.method,
                    inline: true
                }
            }),
            footer: {
                text: 'Made by tenios#7042'
            }
        }
        return embed;
    }

}

module.exports = ContactCommand