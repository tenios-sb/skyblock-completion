const BaseCompletion = require('../baseCompletion');

// const contacts = {
//     'aranya': false,
//     'builder': true,
//     'dusk': true,
//     'oringo': true,
//     'duncan': false,
//     'pet_sitter': true,
//     'queen_mismyla': true,
//     'slayer': true,
//     'ophelia': true,
//     'tomioka': true,
//     'trinity': true,
//     'blacksmith': true,
// }

class AbiphoneContacts extends BaseCompletion {

    constructor() {
        super('abiphone_contacts', 'Abiphone Contacts', 41, -1);
    }

    calculateCompletion(uuid, profileData, playerData) {
        const profile = this.getProfile(uuid, profileData);
        this.value = profile?.nether_island_player_data?.abiphone?.active_contacts?.length || 0;
        // Object.entries(profile?.nether_island_player_data?.abiphone?.contact_data || {}).forEach(([name, contact]) => {
        //     if (name in contacts && (contacts?.[name] === false || contact?.completed_quest)) {
        //         this.value++;
        //     }
        // })

    }

}

module.exports = AbiphoneContacts